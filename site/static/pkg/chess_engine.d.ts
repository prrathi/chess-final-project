/* tslint:disable */
/* eslint-disable */
/**
*/
export class JsBoard {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} row
* @param {number} col
* @returns {JsPiece | undefined}
*/
  get_piece_at(row: number, col: number): JsPiece | undefined;
/**
* @returns {Array<any>}
*/
  get_board(): Array<any>;
/**
* @param {number} row
* @param {number} col
* @returns {Array<any>}
*/
  get_legal_moves(row: number, col: number): Array<any>;
/**
* @param {JsMove} move_
* @returns {boolean}
*/
  apply_move(move_: JsMove): boolean;
/**
* @param {number} from_row
* @param {number} from_col
* @param {number} to_row
* @param {number} to_col
* @returns {JsMove | undefined}
*/
  get_move_from_pos(from_row: number, from_col: number, to_row: number, to_col: number): JsMove | undefined;
}
/**
*/
export class JsMove {
  free(): void;
/**
* @returns {pos}
*/
  from: pos;
/**
* @returns {pos}
*/
  to: pos;
}
/**
*/
export class JsPiece {
  free(): void;
/**
* @returns {boolean}
*/
  is_white(): boolean;
/**
* @returns {boolean}
*/
  is_black(): boolean;
/**
* @returns {string}
*/
  get_piece_type(): string;
/**
* @returns {string}
*/
  get_color(): string;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class pos {
  free(): void;
/**
*/
  x: number;
/**
*/
  y: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_jsboard_free: (a: number) => void;
  readonly jsboard_new: () => number;
  readonly jsboard_get_piece_at: (a: number, b: number, c: number) => number;
  readonly jsboard_get_board: (a: number) => number;
  readonly jsboard_get_legal_moves: (a: number, b: number, c: number) => number;
  readonly jsboard_apply_move: (a: number, b: number) => number;
  readonly jsboard_get_move_from_pos: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg_jspiece_free: (a: number) => void;
  readonly jspiece_is_white: (a: number) => number;
  readonly jspiece_is_black: (a: number) => number;
  readonly jspiece_get_piece_type: (a: number, b: number) => void;
  readonly jspiece_get_color: (a: number, b: number) => void;
  readonly jspiece_toString: (a: number, b: number) => void;
  readonly __wbg_jsmove_free: (a: number) => void;
  readonly jsmove_from: (a: number) => number;
  readonly jsmove_set_from: (a: number, b: number) => void;
  readonly jsmove_to: (a: number) => number;
  readonly jsmove_set_to: (a: number, b: number) => void;
  readonly __wbg_get_pos_x: (a: number) => number;
  readonly __wbg_set_pos_x: (a: number, b: number) => void;
  readonly __wbg_get_pos_y: (a: number) => number;
  readonly __wbg_set_pos_y: (a: number, b: number) => void;
  readonly __wbg_pos_free: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
