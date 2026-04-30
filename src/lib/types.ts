export interface ImageFormatOption { value: string; label: string; }

export interface FormState {
  folder: string;
  format: string;
  width: number;
  height: number;
  keepDims: boolean;
  quality: number;
  transformation: string;
}

export type OnChange<T> = (value: T) => void;

export interface DropzoneFileEvent { file: File; }