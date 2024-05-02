
//import './App.css'
//import ExampleParent from './Components/HookTest';
import BasicTable from './Components/MUITable';
import PMTableWithoutChildrenComponenets from './Components/PMTableWithoutChildrenComponents'
import TableInformation from './data/table.information.json';

function App() {
    console.log('App', TableInformation.information);
    return (
        <PMTableWithoutChildrenComponenets
            caption={TableInformation.information.title.text}
            data={TableInformation.information.reservations.content}
        />

    );
}

export default App

/*

    <BasicTable />
    {/*
    <PMTableWithoutChildrenComponenets
      caption={TableInformation.information.title.text}
      header={TableInformation.information.colunmHeader.content}
      data={TableInformation.information.reservations.content}
    />
    
    Histórico de Testes 
    -------------------
                    <PMTableCaption text={caption} />
                    <PMTableHeader header={header} />
                    <PMTableBody data={data} />

        <table onClick={this.onClick}>
                <caption>{caption}</caption>
                <thead>
                    <tr>
    header.map((title, idx) => {
                            return <th key={idx}>{title}</th>;
    )}
                    </tr>
                    </thead>
                    <tbody>
    this.state.data.map((row, idx) => {
                            return (
                                <tr key={idx}>
                row.map((cell, idx) => {
                                        return <td key={idx}>{cell}</td>;
                
                                    )}
                                </tr>
                            );
    
                        )}
                    </tbody>
            </table>

             *const html_caption = new PMTableCaption({ text: caption }).render();
             *const html_headers = new PMTableHeader({ header: header }).render();
             *const html_body = new PMTableBody({ data: data }).render();


             *<table onClick={this.onClick}>
             *    {html_caption}
             *    {html_headers}
             *    {html_body}
             *</table>

    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Array) {
            let copy = [];
            for (let i = 0; i < obj.length; i++) {
                copy[i] = this.deepClone(obj[i]);
            }
            return copy;
        }

        if (obj instanceof Object) {
            let copy = {};
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    copy[key] = this.deepClone(obj[key]);
                }
            }
            return copy;
        }
    }
                                <>
                                        <tr key={rowidx} data-row={rowidx}>
                                            row.map((cell, columnidx) => {
                                                const edit = this.state.edit;
                                                if (edit && edit.row === rowidx && edit.column === columnidx) {
                                                    cell = (
                                                        <form onSubmit={this.onSaveEdit}>
                                                            <input type="text" defaultValue={cell} />
                                                        </form>
                                                    )
                                                }
                                            return <td key={columnidx}>{cell}</td>;
                                        </tr>
                                </>
                                                          <svg xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 24 24"
                                onClick={this.onMenuDownloadClick}>
                                <path fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v8.5m0 0l3-3m-3 3l-3-3M5 15v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2">
                                </path>
                            </svg>
*/