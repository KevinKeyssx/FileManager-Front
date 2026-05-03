export interface ImageFormatOption { value: string; label: string; }

export interface FormState {
	folder         : string;
	format         : string;
	width          : number | null;
	height         : number | null;
	keepDims       : boolean;
	useOriginal    : boolean;
	quality        : number;
	transformation : string;
}

export type OnChange<T> = (value: T) => void;

export interface DropzoneFileEvent { file: File; }

export interface CloudinaryResource {
	asset_id      : string;
	public_id     : string;
	version       : number;
	version_id    : string | null;
	format        : string;
	resource_type : string;
	type          : string;
	created_at    : string;
	bytes         : number;
	url           : string;
	secure_url    : string;
	folder        : string;
	etag          : string;
	status        : string;
	access_mode   : string;
	access_control: null;
	width         : number;
	height        : number;
	aspect_ratio  : number;
	pixels        : number;
	duration      : null;
	playback_url  : null;
	audio         : null;
	video         : null;
}

export interface FileManagerResponse {
	total_count : number;
	time        : number;
	resources   : CloudinaryResource[];
}