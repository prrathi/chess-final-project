
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/
export class JsBoard {

    static __wrap(ptr) {
        const obj = Object.create(JsBoard.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsboard_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.jsboard_new();
        return JsBoard.__wrap(ret);
    }
    /**
    * @param {number} row
    * @param {number} col
    * @returns {JsPiece | undefined}
    */
    get_piece_at(row, col) {
        var ret = wasm.jsboard_get_piece_at(this.ptr, row, col);
        return ret === 0 ? undefined : JsPiece.__wrap(ret);
    }
    /**
    * @returns {Array<any>}
    */
    get_board() {
        var ret = wasm.jsboard_get_board(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {number} row
    * @param {number} col
    * @returns {Array<any>}
    */
    get_legal_moves(row, col) {
        var ret = wasm.jsboard_get_legal_moves(this.ptr, row, col);
        return takeObject(ret);
    }
    /**
    * @param {JsMove} move_
    * @returns {boolean}
    */
    apply_move(move_) {
        _assertClass(move_, JsMove);
        var ptr0 = move_.ptr;
        move_.ptr = 0;
        var ret = wasm.jsboard_apply_move(this.ptr, ptr0);
        return ret !== 0;
    }
    /**
    * @param {number} from_row
    * @param {number} from_col
    * @param {number} to_row
    * @param {number} to_col
    * @returns {JsMove | undefined}
    */
    get_move_from_pos(from_row, from_col, to_row, to_col) {
        var ret = wasm.jsboard_get_move_from_pos(this.ptr, from_row, from_col, to_row, to_col);
        return ret === 0 ? undefined : JsMove.__wrap(ret);
    }
}
/**
*/
export class JsMove {

    static __wrap(ptr) {
        const obj = Object.create(JsMove.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsmove_free(ptr);
    }
    /**
    * @returns {pos}
    */
    get from() {
        var ret = wasm.jsmove_from(this.ptr);
        return pos.__wrap(ret);
    }
    /**
    * @param {pos} from
    */
    set from(from) {
        _assertClass(from, pos);
        var ptr0 = from.ptr;
        from.ptr = 0;
        wasm.jsmove_set_from(this.ptr, ptr0);
    }
    /**
    * @returns {pos}
    */
    get to() {
        var ret = wasm.jsmove_to(this.ptr);
        return pos.__wrap(ret);
    }
    /**
    * @param {pos} to
    */
    set to(to) {
        _assertClass(to, pos);
        var ptr0 = to.ptr;
        to.ptr = 0;
        wasm.jsmove_set_to(this.ptr, ptr0);
    }
}
/**
*/
export class JsPiece {

    static __wrap(ptr) {
        const obj = Object.create(JsPiece.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jspiece_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    is_white() {
        var ret = wasm.jspiece_is_white(this.ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_black() {
        var ret = wasm.jspiece_is_black(this.ptr);
        return ret !== 0;
    }
    /**
    * @returns {string}
    */
    get_piece_type() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.jspiece_get_piece_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get_color() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.jspiece_get_color(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.jspiece_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
*/
export class pos {

    static __wrap(ptr) {
        const obj = Object.create(pos.prototype);
        obj.ptr = ptr;

        return obj;
    }

    toJSON() {
        return {
            x: this.x,
            y: this.y,
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pos_free(ptr);
    }
    /**
    */
    get x() {
        var ret = wasm.__wbg_get_pos_x(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_pos_x(this.ptr, arg0);
    }
    /**
    */
    get y() {
        var ret = wasm.__wbg_get_pos_y(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_pos_y(this.ptr, arg0);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('chess_engine_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_jspiece_new = function(arg0) {
        var ret = JsPiece.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_jsmove_new = function(arg0) {
        var ret = JsMove.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_949bbc1147195c4e = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_284486ca27c6aa8b = function(arg0, arg1) {
        var ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

