/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_jsboard_free(a: number): void;
export function jsboard_new(): number;
export function jsboard_get_piece_at(a: number, b: number, c: number): number;
export function jsboard_get_board(a: number): number;
export function jsboard_get_legal_moves(a: number, b: number, c: number): number;
export function jsboard_apply_move(a: number, b: number): number;
export function jsboard_get_move_from_pos(a: number, b: number, c: number, d: number, e: number): number;
export function __wbg_jspiece_free(a: number): void;
export function jspiece_is_white(a: number): number;
export function jspiece_is_black(a: number): number;
export function jspiece_get_piece_type(a: number, b: number): void;
export function jspiece_get_color(a: number, b: number): void;
export function jspiece_toString(a: number, b: number): void;
export function __wbg_jsmove_free(a: number): void;
export function jsmove_from(a: number): number;
export function jsmove_set_from(a: number, b: number): void;
export function jsmove_to(a: number): number;
export function jsmove_set_to(a: number, b: number): void;
export function __wbg_get_pos_x(a: number): number;
export function __wbg_set_pos_x(a: number, b: number): void;
export function __wbg_get_pos_y(a: number): number;
export function __wbg_set_pos_y(a: number, b: number): void;
export function __wbg_pos_free(a: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number): void;
