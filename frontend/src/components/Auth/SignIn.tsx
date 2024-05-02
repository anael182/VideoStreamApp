import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/system'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SignInProps {
    sx?: SxProps<Theme>
}

function Copyright(props: SignInProps) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link
                color="inherit"
                href="https://github.com/anael182/VideoStreamApp/"
            >
                StreamApp
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const defaultTheme = createTheme()

export default function SignIn(props: any) {
    const { setIsLoggedIn } = props
    const navigate = useNavigate()
    const [errrorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const form = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        const { data } = await axios.post('/api/user/signin', form)
        if (data.status === parseInt('401')) {
            setErrorMessage(data.response)
        } else {
            localStorage.setItem('token', data.token)
            setIsLoggedIn(true)
            navigate('/video')
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
