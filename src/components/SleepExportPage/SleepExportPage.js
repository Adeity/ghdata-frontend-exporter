import {Alert, Col, Row} from "react-bootstrap";
import React from "react";
import {sendExportSleepsRequest, sendGetActiveResearchNumbersRequest} from "../AxiosRequestor/AxiosRequestor";
import {getActiveDescription} from "../ParticipantsPage/ParticipantsUtils";
import StatusInfoComponent from "../StatusInfoComponent";

class SleepExportPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
                id: e.id,
                value: e.researchNumber,
                allowed: e.allowed,
                deregistrationTime: e.deregistrationTime,
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
                console.log(res)
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

    handleExportButtonClick(e) {
        e.preventDefault()
        this.setState({loading: false})
        const checkedResearchNumbers = this.getResearchNumberCheckedValues()
        if (checkedResearchNumbers.length < 1) {
            this.setState({errorMessage: "Musí být vybrán alespoň jeden účastník."})
            return;
        }
        if (this.state.dateTo === "" || this.state.dateFrom === "") {
            this.setState({errorMessage: "Musí být vybrán datum od i do."})
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
            // <div key={"all"}>
            //     <Form.Check
            //         type={"checkbox"}
            //         id={"allResearchNumbers"}
            //         value={this.state.allResearchersChecked}
            //         onChange={(e) => this.handleToggleAllResearchersChecbox(e)}
            //         label={"Vsichni ucastnici"}/>
            // </div>
            <div key={"all"} className={"form-check"}>
                <label
                    className={"form-check-label"}
                    htmlFor={"allResearchNumbers"}
                >
                    {"Všichni účastníci"}</label>
                <input
                    id={"allResearchNumbers"}
                    onChange={(e) => this.handleToggleAllResearchersChecbox(e)}
                    className={"form-check-input"}
                    type={"checkbox"}
                    value={this.state.allResearchersChecked}
                    onChange={(e) => this.handleToggleAllResearchersChecbox(e)}
                    label={"Vsichni ucastnici"}/>
            </div>
        )
        this.state.researchNumbers.forEach((e, i) => {
            const isChecked = this.state.allResearchersChecked ? true : e.checked
            // const isAllowed = e.allowed ? "" : "(odhlášen)"
            if (e.allowed === false && e.deregistrationTime === undefined) {
                return;
            }
            researchNumbers.push(
                // <div key={i}>
                //     <label className={"form-label"}>{e.value}</label>
                //     <input className={"form-control"} type={"checkbox"} value={e.value}/>
                // </div>

                <div key={i} className={"form-check"}>
                        <label
                            className={"form-check-label"}
                            htmlFor={e.value + "checkbox"}
                        >
                            {e.value} <span className={"text-muted"}>(<StatusInfoComponent allowed={e.allowed} deregistrationTime={e.deregistrationTime}/>)</span>
                        </label>
                        <input
                            id={e.value + "checkbox"}
                            onChange={(event) => this.setResearchNumberChecked(e.id, event.target.checked)}
                            className={"form-check-input"}
                            type={"checkbox"}
                            checked={isChecked}
                            disabled={this.state.allResearchersChecked}
                            value={e.value}
                        />

                </div>
            )
        })
        const errorAlert = this.state.errorMessage !== null ? <Alert variant={"danger"}>{this.state.errorMessage}</Alert> : null;
        const loadingAlert = this.state.loading === true ? <Alert variant={"info"}>Probiha export</Alert> : null;
        return (
            <div className={"m-auto w-md-75 form-signin"}>
                <h6>Export spánku</h6>
                <form>
                    <div className={"mb-3 form-floating"}>
                        <input className={"form-control"} type={"date"} id={"dateFrom"}
                               onChange={(e) => this.handleDateFromChange(e)} value={this.state.dateFrom}/>
                        <label className={"form-label"}>Datum od</label>
                    </div>
                    <div className={"mb-3 form-floating"}>
                        <input className={"form-control"} type={"date"} id={"dateFrom"}
                               onChange={(e) => this.handleDateToChange(e)} value={this.state.dateTo}/>
                        <label className={"form-label"}>Datum do</label>
                    </div>
                    <div className={"d-flex flex-column"}>
                        <label className={"form-label"}>Učastníci</label>
                        {researchNumbers}
                    </div>
                    <button
                        onClick={(e) => this.handleExportButtonClick(e)}
                        className="w-100 btn btn-lg btn-primary mt-3 mb-2"
                        type="submit">Export do XLS
                    </button>
                    {errorAlert}
                    {loadingAlert}
                </form>
            </div>
        )
    }

}

export default SleepExportPage