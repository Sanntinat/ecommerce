import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { useFetch } from '../../../Request/fetch';

export default function Formulario({editedProduct, setEditedProduct, handleInputChange}) {
  const { data: tags, loading: loadingTags } = useFetch('/tags/');

  return (
    <>
    <TextField
    label="Nombre"
    value={editedProduct?.nombre || ''}
    onChange={(e) => handleInputChange('nombre', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
    />

  <Autocomplete // Selector de tags
    multiple
    options={tags?.results || []}
    getOptionLabel={(option) => option.nombre}
    value={tags?.results.filter((tag) => editedProduct?.tags?.includes(tag.id)) || []}
    onChange={(_, value) => handleInputChange('tags', value.map((tag) => tag.id))}
    loading={loadingTags}
    renderInput={(params) => (
      <TextField
      {...params}
      label="Tags"
      sx={{
        backgroundColor: 'white',
      }}
      />
    )}
    />
  
  <TextField
    label="Precio"
    type="number"
    value={editedProduct?.precio ?? ''}
    onChange={(e) => handleInputChange('precio', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
    />
  <TextField
    label="Stock"
    type="number"
    value={editedProduct?.stock || ''}
    onChange={(e) => handleInputChange('stock', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
  />
  <TextField
    label="Descripción"
    multiline
    rows={4}
    value={editedProduct?.descripcion || ''}
    onChange={(e) => handleInputChange('descripcion', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
    />
    </>
  )
}

