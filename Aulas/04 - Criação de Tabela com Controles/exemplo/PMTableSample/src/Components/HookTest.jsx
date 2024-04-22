/*
import React from 'react';

import { PropTypes } from 'prop-types';

export function ExampleHook({ layout, prelayout }) {
    React.useLayoutEffect(() => {
        const table = document.getElementsByTagName('table')[0];
        console.log('useLayoutEffect', ' ', table.offsetWidth);
        if (layout) {
            table.style.width = '700px';
        }
        if (prelayout) {
            table.style.width = '500px';
            table.style.height = '20px';
        }
        const tableSize = document.getElementById('size');
        tableSize.innerHTML = `Table width: ${table.offsetWidth}`;
    }, [layout, prelayout]);
    //React.useEffect(() => {
    //    const table = document.getElementsByTagName('table')[0];
    //    console.log('useEffect', ' ', table.offsetWidth);
    //    if (layout) {
    //        table.style.width = '130%';
    //    }
    //    if (prelayout) {
    //        table.style.width = '50%';
    //    }
    //}, [layout, prelayout]);
    return (
        <table border="1" style={{ }}>
            <thead>
                <tr>
                    <th>Random</th>
                </tr>
            </thead>
            <tbody>
                {Array.from(Array(10)).map((_, idx) => (
                    <tr key={idx}>
                        <td width={Math.random() * 800}>{Math.random()}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <b>
                            <span id="size"></span>
                        </b>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default function ExampleParent() {
    const [layout, setLayout] = React.useState(null);
    const [prelayout, setPreLayout] = React.useState(null);
    return (
        <div>
            <button onClick={() => { setLayout(true), setPreLayout(false) }}>useEffect</button>{' '}
            <button onClick={() => { setLayout(false), setPreLayout(true) }}>useLayoutEffect</button>{' '}
            <button onClick={() => { setLayout(null), setPreLayout(null) }}>clear</button>
            <ExampleHook layout={layout} prelayout={prelayout} />
        </div>
    );
}

ExampleHook.propTypes = {
    layout: PropTypes.bool,
    prelayout: PropTypes.bool
}

ExampleHook.propsDefault = {
    layout: false,
    prelayout: false
}

*/
