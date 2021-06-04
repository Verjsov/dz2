import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            header: '',
            link: '',
            description: '',
            category_1: false,
            category_2: false,
            type: '',
            sale: false,
            country: [''],
            validates: {
                'vCode': '* Обязательное  поле (только цифры)',
                'vHeader': '* Обязательное  поле, max 50 символов',
                'vLink': null,
                'vType': '* Обязательное поле',
                'vCategory': '* Обязательное поле, минимум 1 категория должна быть выбрана',
                'vCountry': '* Обязательное поле'
            },
            notValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValidateCode = this.handleValidateCode.bind(this);
        this.handleValidateHeader = this.handleValidateHeader.bind(this);
        this.handleValidateLink = this.handleValidateLink.bind(this);
        this.handleValidateText = this.handleValidateText.bind(this);
        this.handleValidateType = this.handleValidateType.bind(this);
        this.handleValidateCategory = this.handleValidateCategory.bind(this);
        this.handleValidateOption = this.handleValidateOption.bind(this);
        this.checkAllForm = this.checkAllForm.bind(this);
        this.handleSubmit = this.props.handleSubmit.bind(this);
    }

    handleValidateCode(e){
        let val = e.target.value.replace(/\D/gmi, '');
        let errors = null;
        if (val.length === 0)
            errors = "* Обязательное  поле (только цифры)";
        this.setState((state)=>{
            const validate = state.validates;
            validate.vCode = errors;
            return {code:val,validates:validate};
        });
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    handleValidateHeader(e){
        let val = e.target.value;
        let errors = null;
        if (val.length === 0)
            errors = "* Обязательное  поле, max 50 символов";
        if (val.length <= 50){
            this.setState((state)=>{
                const validate = state.validates;
                validate.vHeader = errors;
                return {header:val,validates:validate};
            });
        }
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    handleValidateText(e){
        let val = e.target.value;
        if (val.length <= 200)
            this.setState({description:val});
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    handleValidateOption(e){
        let val = Array.from(e.target.selectedOptions, option => option.value);
        let errors = null;
        if (val.length < 1)
            errors = "* Обязательное поле";
        this.setState((state)=>{
            const validate = state.validates;
            validate.vCountry = errors;
            return {country:val,validates:validate};
        });
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    handleValidateType(e){
        let val = e.target.value;
        let errors = null;
        if (!val)
            errors = "* Обязательное поле";
        this.setState((state)=>{
            const validate = state.validates;
            validate.vType = errors;
            return {type:val,validates:validate};
        });
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    handleValidateCategory(e){
        let val = e.target.checked;
        const name = e.target.name;
        let errors = null;
        this.setState({[name]: val});
        process.nextTick(() => {
            if (!val && this.state.category_1 === false && this.state.category_2 === false)
                errors = "* Обязательное поле, минимум 1 категория должна быть выбрана";
            this.setState((state)=>{
                const validate = state.validates;
                validate.vCategory = errors;
                return {validates:validate};
            });
            process.nextTick(() => {
                this.checkAllForm()
            })
        })

    }

    handleValidateLink(e){
        let val = e.target.value;
        let errors = null;
        if (val.length > 4){
            if (!(/^http(s)?:\/\//gmi.test(val)))
                errors = "* Неправильный вид ссылки";
        }
        this.setState((state)=>{
            const validate = state.validates;
            validate.vLink = errors;
            return {link:val,validates:validate};
        });
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    handleChange(e) {
        const value = e.target.checked
        const name = e.target.name;
        this.setState({[name]: value});
        process.nextTick(() => {
            this.checkAllForm()
        })
    }

    checkAllForm (){
        const val = Object.fromEntries(
            Object.entries(this.state.validates).filter(([key, x]) => x !== null) )
        if (Object.keys(val).length === 0)
            this.setState({notValid: false});
        else
            this.setState({notValid: true});
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Код продукта:
                        <input name="code" type="text" value={this.state.code} onChange={this.handleValidateCode} />
                        {this.state.validates.vCode !== null && (<span style={{color:"red"}}>{this.state.validates.vCode}</span>)}
                    </label>
                </div>
                <div>
                    <label>
                        Заголовок:
                        <input name="header" type="text" value={this.state.header} onChange={this.handleValidateHeader} />
                        {this.state.validates.vHeader !== null && (<span style={{color:"red"}}>{this.state.validates.vHeader}</span>)}
                    </label>
                </div>
                <div>
                    <label>
                        Ссылка на изображение:
                        <input name="link" type="text" value={this.state.link} onChange={this.handleValidateLink} />
                        {this.state.validates.vLink !== null && (<span style={{color:"red"}}>{this.state.validates.vLink}</span>)}
                    </label>
                </div>
                <div>
                    <label>
                        Описание :
                        <textarea name="description" value={this.state.description} onChange={this.handleValidateText} />
                    </label>
                </div>
                <div>
                    <label>
                        Тип продукта 1:
                        <input type="radio" name="type" value="type_1"
                               checked={this.state.type === "type_1"} onChange={this.handleValidateType} />
                    </label>
                    <label>
                        Тип продукта 2:
                        <input type="radio" name="type" value="type_2"
                               checked={this.state.type === "type_2"} onChange={this.handleValidateType} />
                    </label>
                    <label>
                        Тип продукта 3:
                        <input type="radio" name="type" value="type_3"
                               checked={this.state.type === "type_3"} onChange={this.handleValidateType} />
                    </label>
                    {this.state.validates.vType !== null && (<span style={{color:"red"}}>{this.state.validates.vType}</span>)}
                </div>

                <div>
                    <label>
                        Категория 1:
                        <input type="checkbox" name="category_1" checked={this.state.category_1} onChange={this.handleValidateCategory} />
                    </label>
                    <label>
                        Категория 2:
                        <input type="checkbox" name="category_2" checked={this.state.category_2} onChange={this.handleValidateCategory} />
                    </label>
                    {this.state.validates.vCategory !== null && (<span style={{color:"red"}}>{this.state.validates.vCategory}</span>)}
                </div>

                <div>
                    <label>
                        Акционный продукт:
                        <input type="checkbox" name="sale" checked={this.state.sale} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        Cтрана производитель:
                        <select name="country" multiple onChange={this.handleValidateOption} value={this.state.country}>
                            <option value="UKRAINE">UKRAINE</option>
                            <option value="RUSSIA">RUSSIA</option>
                            <option value="USA">USA</option>
                            <option value="GERMANY">GERMANY</option>
                            <option value="CHINA">CHINA</option>
                            <option value="JAPAN">JAPAN</option>
                        </select>
                    </label>
                    {this.state.validates.vCountry !== null && (<span style={{color:"red"}}>{this.state.validates.vCountry}</span>)}
                </div>

                <input type="submit" value="Сохранить" disabled={this.state.notValid} />
            </form>
        );
    }
}

ProductForm.propTypes = {
    handleSubmit: PropTypes.func,
};

ProductForm.defaultProps = {
    handleSubmit: (e) => {
        console.log(e);
    },
};