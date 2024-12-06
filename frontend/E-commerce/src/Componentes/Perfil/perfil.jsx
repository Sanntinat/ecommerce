import { useFetchUser } from '../../Request/v2/fetchUser';

export default function Perfil() {

  const { nombre, apellido, admin, email, dni, loading, error } = useFetchUser(); 
  console.log(nombre)
  console.log(apellido)
  console.log(admin)
  console.log(dni)
    
};