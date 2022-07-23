import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// @ts-ignore
import parse from 'autosuggest-highlight/parse'

import { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Coordinates } from '../../shared/models/coordinates'
import { debounce } from '@mui/material'
import { SearchIcon } from './MapsAutocomplete.styled'

const autocompleteService = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}

interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[]
}

interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

export const MapsAutocomplete = ({
  valueChanges,
}: {
  valueChanges: (value: Coordinates) => void
}) => {
  const [value, setValue] = useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly PlaceType[]>([])

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          ;(autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          )
        },
        500
      ),
    []
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300, position: 'absolute', top: '20px', right: '30px' }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        if (newValue) {
          getGeocode({ address: newValue.description })
            .then((results) => {
              return getLatLng(results[0])
            })
            .then((coordinates: Coordinates) => {
              valueChanges(coordinates)
            })
            .catch((e) => {
              console.log(e)
            })
        }
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          sx={{ background: 'white !important' }}
          variant={'filled'}
          {...params}
          label="Add a location"
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item xs>
                {
                  // @ts-ignore
                  parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))
                }
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
