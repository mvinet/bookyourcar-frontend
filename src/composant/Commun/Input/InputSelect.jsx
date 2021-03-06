import React from 'react';
import * as PropTpyes from 'prop-types';
import {FormControl, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem/index";
import InputLabel from "@material-ui/core/InputLabel/index";
import FormHelperText from "@material-ui/core/FormHelperText/index";

const InputSelect = props => {

    const {fullWidth, onChange, data, name, label, message, value, id, style, disabled} = props;

    return (
        <FormControl margin={"normal"} fullWidth={fullWidth} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
                onChange={onChange}
                value={value}
                error={message && !!message[name]}
                inputProps={{
                    name: name,
                    id: id
                }}
                style={style}
            >
                {data && data.map((item, i) =>
                    <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
                )}
            </Select>
            {message && message[name] &&
            <FormHelperText>{message[name][0]}</FormHelperText>
            }

        </FormControl>
    )
};


InputSelect.defaultProps = {
    fullWidth: true
};

InputSelect.propTypes = {
    id: PropTpyes.string,
    data: PropTpyes.array,
    fullWidth: PropTpyes.bool,
    onChange: PropTpyes.func,
    name: PropTpyes.string,
    label: PropTpyes.string,
    message: PropTpyes.any
};


export default InputSelect;