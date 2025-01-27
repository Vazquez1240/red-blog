import { FaHospitalUser } from "react-icons/fa";

/*
interfaces del componente login
 */

export interface FormDataLogin {
  email: string;
  password: string;
}

/*
interfaces del ocmponente registro

 */

export interface FormDataRegister {
  email: string;
  password: string;
  password2: string;
  username: string;
}

export interface GenericDataBase {
  status: boolean;
  isSuccesOrFail: boolean;
  modal_verify: boolean;
  isDismissable?: false;
  backdrop?: "blur";
  close: (value: boolean) => void;
}
export interface GenericDataInput extends GenericDataBase {
  type_modal: "input";
  inputData: string;
  setInputValue: (value: string) => void;
}

export interface GenericDataText extends GenericDataBase {
  icon: typeof FaHospitalUser;
  type_modal: "text";
}

export interface ModalData {
  titulo: string;
  message: string;
  textBtn: string;
  colorIcon?: string;
  function_buton: () => void;
}

export interface ModalSuccess {
  icon: typeof FaHospitalUser;
  titulo: string;
  message: string;
  textBtn: string;
  function_buton: () => void;
}

export interface ModalFail {
  icon: typeof FaHospitalUser;
  titulo: string;
  message: string;
  textBtn: string;
  function_buton: () => void;
}

export type GenericData = GenericDataInput | GenericDataText;

export interface RegistroResponse {
  status: number;
  data: any;
}

/*
Interface de AuthContext
 */

export interface userData {
  accessToken: string;
  refreshToken: string;
  uuid: string;
  userId: number;
  isSuperuser: boolean;
  user_photo: string;
}

export interface AuthContextType {
  user: userData | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  status: string;
}

/*

Interface Feed
 */

export interface Comments {
  content: string;
  author_uuid: string;
  author_username: string;
  created_at: string;
}

export interface ResultsPosts {
  title: string;
  content: string;
  author_uuid: string;
  author_username: string;
  author_email: string;
  likes: string[];
  comments: Comments[];
  author_photo: string;
  id:string;
}
export interface Post {
  current_page: number;
  results: ResultsPosts[];
  total_items: number;
  total_pages: number;
}

export interface Posts {
  status: number;
  data: Post[];
}
