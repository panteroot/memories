import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"

const Input = ({ half, name , label, handleShowPassword, handleChange, type, autoFocus }) => {
    return (
        <Grid item xs={12} sm={half? 6: 12}>
            <TextField
                name={name}
                label={label}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                type={type}
                autoFocus={autoFocus}
                InputProps={ name === 'password'?
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    { type === 'password'? <Visibility/> : <VisibilityOff/> }
                                </IconButton>
                            </InputAdornment>
                        )
                    }   : null      
                }
            />
        </Grid>
    )
}

export default Input;