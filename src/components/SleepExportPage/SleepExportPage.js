import {Alert, Col, Row} from "react-bootstrap";
import React from "react";
import {sendExportSleepsRequest, sendGetActiveResearchNumbersRequest} from "../AxiosRequestor/AxiosRequestor";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class SleepExportPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dateFrom: "",
            dateTo: "",
            researchNumbers: [],
            allResearchersChecked: false,
            errorMessage: null,
            loading: false
        }
    }
    setDateFrom(dateFrom) {
        this.setState({dateFrom: dateFrom})
    }
    setDateTo(dateTo) {
        this.setState({dateTo: dateTo})
    }
    setResearchNumbersFromResponse(researchNumberFromResponse) {
        const researchNumbers = []
        researchNumberFromResponse.forEach((e, index) => {
            researchNumbers.push({
                id: index,
                value: e,
                checked: false
            })
        })
        this.setState({researchNumbers: researchNumbers})
    }
    setResearchNumberChecked(id, newChecked) {
        const newResearchNumbers = [...this.state.researchNumbers]
        newResearchNumbers.forEach((e) => {
            if (e.id === id) {e.checked = newChecked}
        })
        this.setState({researchNumbers: newResearchNumbers})
    }
    getResearchNumberCheckedValues() {
        return this.state.researchNumbers.filter(e => {
            if (this.state.allResearchersChecked) {
                return true
            }
            return e.checked;
        }).map(e => e.value)
    }
    handleDateFromChange(e) {
        this.setDateFrom(e.target.value)
    }
    handleDateToChange(e) {
        this.setDateTo(e.target.value)
    }
    handleToggleAllResearchersChecbox(e) {
        this.setState({allResearchersChecked: e.target.checked})
    }
    getResearchNumbers() {
        sendGetActiveResearchNumbersRequest()
            .then((res) => {
                this.setResearchNumbersFromResponse(res.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    componentDidMount() {
        this.getResearchNumbers();
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - 7)
        this.setDateTo(new Date().toISOString().slice(0, 10))
        this.setDateFrom(dateFrom.toISOString().slice(0, 10))
    }

    handleExportButtonClick() {
        this.setState({loading: false})
        const checkedResearchNumbers = this.getResearchNumberCheckedValues()
        if (checkedResearchNumbers.length < 1) {
            this.setState({errorMessage: "Musi byt vybran alespon jeden ucastnik."})
            return;
        }
        if (this.state.dateTo === "" || this.state.dateFrom === "") {
            this.setState({errorMessage: "Musi byt zadan datum od i do"})
            return;
        }

        this.setState({errorMessage: null})

        this.setState({loading: true})
        sendExportSleepsRequest(this.state.dateFrom, this.state.dateTo, checkedResearchNumbers)
            .then((res) => {
                // Trick for making downloadable link
                const today = new Date();
                const a = document.createElement('a');
                const blob = new Blob([res.data], {type: "blob"})
                a.href = window.URL.createObjectURL(blob);
                // Give filename you wish to download
                a.download = "export-spanku-" + today.getTime() + ".xls";
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                this.setState({loading: false})
            }).catch(async (err) => {
                const message = JSON.parse(await err.response.data.text())
                if (message !== null) {
                    this.setState({errorMessage: message.message})
                } else {
                    this.setState({errorMessage: "Export skoncil chybou"})
                }
                this.setState({loading: false})
            })

    }

    render() {
        const researchNumbers = []
        researchNumbers.push(
            <div key={"all"}>
                <Form.Check
                    type={"checkbox"}
                    id={"allResearchNumbers"}
                    value={this.state.allResearchersChecked}
                    onChange={(e) => this.handleToggleAllResearchersChecbox(e)}
                    label={"Vsichni ucastnici"}/>
            </div>
        )
        this.state.researchNumbers.forEach((e, i) => {
            const isChecked = this.state.allResearchersChecked ? true : e.checked
            researchNumbers.push(
                <div key={i}>
                    <Form.Check
                        type={"checkbox"}
                        id={i}
                        disabled={this.state.allResearchersChecked}
                        checked={isChecked}
                        onChange={(event) => this.setResearchNumberChecked(e.id, event.target.checked)}
                        label={e.value}/>
                </div>
            )
        })
        const errorAlert = this.state.errorMessage !== null ? <Alert variant={"danger"}>{this.state.errorMessage}</Alert> : null;
        const loadingAlert = this.state.loading === true ? <Alert variant={"info"}>Probiha export</Alert> : null;
        return (
            <div>
                <h3>Export spanku</h3>
                <Row>
                    <Row>
                        <Col>
                            <b>Datum</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"d-flex justify-content-center"}>
                            <label className={"pe-2"}>Od</label>
                            <input type={"date"} id={"dateFrom"} onChange={(e) => this.handleDateFromChange(e)} value={this.state.dateFrom}/>
                        </Col>
                        <Col className={"d-flex justify-content-center"}>
                            <label className={"pe-2"}>Do</label>
                            <input type={"date"} id={"dateTo"} onChange={(e) => this.handleDateToChange(e)} value={this.state.dateTo}/>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <Col>
                        <b>Ucastnici</b>
                        {researchNumbers}
                    </Col>
                </Row>
                <Row>
                    <Button onClick={() => this.handleExportButtonClick()}>Export do XLS</Button>
                </Row>
                <Row>
                    {errorAlert}
                    {loadingAlert}
                </Row>
            </div>
        )
    }

}

export default SleepExportPage