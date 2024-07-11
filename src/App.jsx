import styled from "styled-components"
import GlobalStyles from "./components/GlobalStyles"
import Cabecera from "./components/Cabecera"
import BarraLateral from "./components/BarraLateral"
import Banner from "./components/Banner"
import banner from './assets/banner.png'
import Pie from "./components/Pie"
import Galeria from "./components/Galeria"
import fotos from './fotos.json'
import { useState, useEffect } from "react"
import ModalZoom from "./components/ModalZoom"

const FondoGradiente = styled.div`
background: linear-gradient(175deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
width: 100%;
min-height: 100vh;
`
const AppContainer = styled.div`
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
`

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`

const ContenidoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = () => {

  const [estado, setEstado] = useState({});
  const [fotosDeGaleria, setFotosDeGaleria] = useState(fotos)
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null)
  const [filtro, setFiltro] = useState('')
  const [tag, setTag] = useState(0)

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag;
      const filtroPorTitulo = !filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase())
      return filtroPorTag && filtroPorTitulo
    })
    setFotosDeGaleria(fotosFiltradas)
  }, [filtro, tag])
  
  const alAlternarFavorito = (foto) => {

    if(foto.id === fotoSeleccionada?.id){
      setFotoSeleccionada({
        ...fotoSeleccionada,
        favorita: !fotoSeleccionada.favorita
      })
    }

    setFotosDeGaleria(fotosDeGaleria.map(fotosDeGaleria =>{
      return{
        ...fotosDeGaleria,
        favorita: fotosDeGaleria.id === foto.id ? !foto.favorita : fotosDeGaleria.favorita
      }
    }))
  }

  return (
    <>
      <FondoGradiente>
        <GlobalStyles></GlobalStyles>
        <AppContainer>
          <Cabecera filtro={filtro} setFiltro={setFiltro}></Cabecera>
          <MainContainer>
            <BarraLateral></BarraLateral>
            <ContenidoGaleria>
            <Banner texto="La galería más completa de fotos del espacio" backgroundImage={banner} />
            <Galeria alSeleccionarFoto={foto=>setFotoSeleccionada(foto)} fotos={fotosDeGaleria} alAlternarFavorito={alAlternarFavorito} setTag={setTag}></Galeria>
            </ContenidoGaleria>
          </MainContainer>
          <Pie></Pie>
        </AppContainer>
        <ModalZoom foto={fotoSeleccionada} 
        alCerrar={() => setFotoSeleccionada(null)} 
        alAlternarFavorito={alAlternarFavorito}></ModalZoom>
      </FondoGradiente>
    </>
  )
}

export default App
