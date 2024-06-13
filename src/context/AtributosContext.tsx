import { Dispatch, ReactNode, createContext, useRef, useState } from "react";
import Categoria from "../entidades/Categoria";
import CategoriaService from "../servicios/CategoriaService";
import UnidadMedida from "../entidades/UnidadMedida";
import UnidadMedidaService from "../servicios/UnidadMedidaService";
import ModalGenerico from "../componentes/modalGenerico/ModalGenerico";
import Sucursal from "../entidades/Sucursal";
import SucursalService from "../servicios/SucursalService";
import Empresa from "../entidades/Empresa";
import EmpresaService from "../servicios/EmpresaService";

interface AtributosContextType {
    nombreApartado: string,
    categorias: Categoria[],
    unidadesMedida: UnidadMedida[],
    sucursales: Sucursal[],
    modalSucursales: any,
    empresas: Empresa[],
    modalEmpresas: any,
    setNombreApartado: Dispatch<React.SetStateAction<string>>,
    getCategoriasRest: () => void,
    setCategorias: Dispatch<React.SetStateAction<Categoria[]>>,
    getUnidadesMedidaRest: () => void,
    setUnidadesMedida: Dispatch<React.SetStateAction<UnidadMedida[]>>,
    getSucursalesRest: () => void,
    setSucursales: Dispatch<React.SetStateAction<Sucursal[]>>,
    getEmpresasRest: () => void,
    setEmpresas: Dispatch<React.SetStateAction<Empresa[]>>
}

export const AtributosContext = createContext<AtributosContextType>({
    nombreApartado: '',
    categorias: [],
    unidadesMedida: [],
    sucursales: [],
    modalSucursales: <></>,
    empresas: [],
    modalEmpresas: <></>,
    setNombreApartado: () => {},
    getCategoriasRest: () => {},
    setCategorias: () => {},
    getUnidadesMedidaRest: () => {},
    setUnidadesMedida: () => {},
    getSucursalesRest: () => {},
    setSucursales: () => {},
    getEmpresasRest: () => {},
    setEmpresas: () => {}
});

export function AtributosContextProvider({children} : {children: ReactNode}) {

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida []>([]);
    const [sucursales, setSucursales] = useState<Sucursal []>([]);
    const [empresas, setEmpresas] = useState<Empresa []>([]);
    const [nombreApartado, setNombreApartado] = useState<string>('');

    const modalRefSucursales = useRef<any>(null);
    const modalRefEmpresas = useRef<any>(null);
  
    const urlapi = import.meta.env.VITE_API_URL;
    const categoriaService = new CategoriaService(urlapi + "/categorias");
    const unidadMedidaService = new UnidadMedidaService(urlapi + "/unidadesmedida");
    const sucursalesService = new SucursalService(urlapi + "/sucursales");
    const empresasService = new EmpresaService(urlapi + "/empresas");


    const getCategoriasRest = async () => {
        let categorias:Categoria[] = await categoriaService.getAll();
        setCategorias(categorias);
    }

    const getUnidadesMedidaRest = async () => {
        let unidadesMedida:UnidadMedida[] = await unidadMedidaService.getAll();
        setUnidadesMedida(unidadesMedida);
    }

    const getSucursalesRest = async () => {
        let sucursales:Sucursal[] = await sucursalesService.getAll();
        setSucursales(sucursales);
    }

    const getEmpresasRest = async () => {
        let empresas:Empresa[] = await empresasService.getAll();
        setEmpresas(empresas);
    }

    const openModalSucursales = () => {
        modalRefSucursales.current.openModal();
    }

    const openModalEmpresas = () => {
        modalRefEmpresas.current.openModal();
    }

    const modalSucursales = 
    <>
        <div className="mt-auto mb-2">
        <button onClick={openModalSucursales} className="btn ms-2 p-0" type="button">
        <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
        </div>
        </button>
        </div>
        <ModalGenerico titulo="sucursales" tituloModal="Sucursales" ref={modalRefSucursales}>
            <></>
        </ModalGenerico>
    </>


    const modalEmpresas = 
    <>
        <div className="mt-auto mb-2">
        <button onClick={openModalEmpresas} className="btn ms-2 p-0" type="button">
        <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
        </div>
        </button>
        </div>
        <ModalGenerico titulo="empresas" tituloModal="Empresas" ref={modalRefEmpresas}>
            <></>
        </ModalGenerico>
    </>

    return (
        <AtributosContext.Provider value={{ 
            nombreApartado,
            categorias,
            unidadesMedida,
            sucursales, 
            modalSucursales, 
            empresas,
            modalEmpresas,
            setNombreApartado, 
            getCategoriasRest, 
            setCategorias, 
            getUnidadesMedidaRest, 
            setUnidadesMedida,
            getSucursalesRest, 
            setSucursales,
            getEmpresasRest,
            setEmpresas
            }}>
            {children}
        </AtributosContext.Provider>
    );
}
