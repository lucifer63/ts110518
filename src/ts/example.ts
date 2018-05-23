// 1
function isInArray(arr: any[], ...stack: any[]): boolean {
    return stack.length? stack.every(Array.prototype.includes.bind( arr )) : false;
}

// 2
function summator(...arr: Array<string | number>): number {
    return arr.reduce((stack: number, val: string | number): number => {
        if (isNumber(val)) {
            stack += val;
        } else {
            const parsed = parseFloat( val );
            if (isNaN(parsed)) {
                throw new Error(`Value "${ val }" can't be converted to number!`);
            }
            stack += parsed;
        }
        return stack;
    }, 0);
}

// 3
function getUnique(...values: any[]): any[] {
    return Array.from( new Set(values) );
}

// 4
function bizarreReverse(str: string): string {
    return str.replace(RegExp.words, function(substr, ...args): string {
        return singleBizarreReverse( substr );
    });
}

function singleBizarreReverse(str: string): string {
    let result: string[] = new Array(str.length);



    return result.join('');
}


function init() {
    let result_html = '';

    result_html += createTestHTML(isInArray,[
        [ [1,2,3] ],
        [ [1,2,3], 'asd' ],
        [ [1,2,3], 1,2,3 ],
        [ [1,2,3], 1,2,3,4 ]
    ]);

    result_html += createTestHTML(summator,[
        [ ],
        [ 1 ],
        [ '2' ],
        [ '2.5' ],
        [ 'asd2.4' ],
        [ 1,2,3 ],
        [ 1,2,'3' ],
        [ '1','2','3.5','2e2' ],
        [ '1','2','3', 4 ],
        [ '1','2','3', 4, 'five' ]
    ]);

    result_html += createTestHTML(getUnique,[
        [ ],
        [ 1 ],
        [ 1,2,3 ],
        [ 1,2,3,1,2,3 ],
        [ 1,2,1,2,'1',5 ]
    ]);

    result_html += createTestHTML(bizarreReverse,[
        [ ],
        [ '' ],
        [ ' ' ],
        [ '123456 a1234b' ],
        [ 's1tar3t 2 hellow' ],
        [ 's1ta$%r3t 2 hel^low' ],
        [ 's1tar3t 2   low5' ]
    ]);

    document.body.innerHTML += result_html;
}

document.addEventListener("DOMContentLoaded", init as CallbackFunctionVariadicVoid);




