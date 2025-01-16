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
  backdrop: "blur";
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
