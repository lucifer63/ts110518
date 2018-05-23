type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;
type CallbackFunctionVariadicVoid = (...args: any[]) => void;

interface String {
    cutEdges: () => string;
}

String.prototype.cutEdges = function() {
    return this.slice(1, -1);
};

interface RegExpConstructor {
    words: RegExp;
    spaces: RegExp;
    letter: RegExp;
    not_letter: RegExp;
}

Object.assign(RegExp, {
    words: /\S+/g,
    spaces: /\s+/g,
    letter: /^[a-z]$/i,
    not_letter: /[^\sa-z]/ig
});

function isNumber(arg: string | number): arg is number {
    return typeof arg === 'number';
}

function createTestHTML(f: CallbackFunctionVariadicVoid, arg_sets: any[], html = ''): string {
    html =
        `<table class="test-tbl">
            <tr>
                <td colspan="42">
                    <span>${ f.name || 'Anonymous funciton' }</span>
                    <div>${ f.toString() }</div>
                </td>
            </tr>`;

    arg_sets.forEach((set) => {
        let result: any,
            error = false;

        try {
            result = f.apply(null, set);
        } catch (e) {
            error = true;
            result = e;
        }

        html += `<tr>
            <td>(${ JSON.stringify(set).cutEdges() })</td>
            <td>=></td>
            <td${ error ? ' class="error"' : '' }>${ error ? result : JSON.stringify(result) }</td>
        </tr>`;
    });

    return html + '</table>';
}
