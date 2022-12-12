import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { countryCode } from "../utils/CountryData";
const MyForm = styled(FormGroup)({
  width: "50%",
  gap: 2,
  padding: 20,
  paddingTop: 20,
  margin: "auto",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  ":hover": { boxShadow: "10px 2px 10px rgba(0,0,0,0.5)" },
});
const MyFormControl = styled(FormControl)({
  marginTop: 10,
});
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().required("Required").email("Email is required"),
  number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  pin: yup.string().min(4).required("Required"),
  address: yup.string().required("Required"),
  code: yup.string().required("Required"),
});

export const Contact = ({ currentBank, loadData }) => {
  const url = "http://localhost:8005/contact/";
  const formik = useFormik({
    initialValues: {
      name: currentBank.name,
      email: currentBank.email,
      number: currentBank.number,
      code: currentBank.code,
      pin: currentBank.pin,
      address: currentBank.address,
    },
    onSubmit: (values, { resetForm }) => {
      console.log("fhdgssgsdfgsdg", values);
      axios
        .post(url, values)
        .then((res) => {
          console.log("object", res.data);
          loadData();
          resetForm();
        })
        .catch((err) => {
          console.log("first", err.message);
          resetForm();
        });
    },
    validationSchema,
  });
  // const [number, setNumber] = useState(``);
  // // eslint-disable-next-line
  // const handleChange = (event) => {
  //   setNumber(event.target.value);
  // };

  return (
    <>
      <h1>Contact Form</h1>

      <MyForm component="form" onSubmit={formik.handleSubmit}>
        <MyFormControl>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Full Name "
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
          />
        </MyFormControl>
        <MyFormControl>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
          />
        </MyFormControl>
        <MyFormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <InputLabel id="demo-simple-select-error-label">Code</InputLabel>
              <Select
                fullWidth
                label="Code"
                id="code"
                name="code"
                value={formik.values.code}
                onChange={(e) => {
                  formik.setFieldValue("code", e.target.value);
                }}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                renderValue={(value) => `(${value})`}
              >
                {countryCode.map((country) => (
                  <MenuItem key={country.code} value={country.dial_code}>
                    {country.code}
                    {country.dial_code}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="number"
                name="number"
                label="Phone number"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+257</InputAdornment>
                  ),
                }}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="pin"
                name="pin"
                label="PIN"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.pin}
                error={formik.touched.pin && Boolean(formik.errors.pin)}
                helperText={formik.touched.pin && formik.errors.pin}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
        </MyFormControl>

        <MyFormControl>
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            onBlur={formik.handleBlur}
          />
        </MyFormControl>
        <MyFormControl>
          <Button
            onClick={formik.handleSubmit}
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ width: { xs: "100%", lg: "10%" }, marginTop: 5 }}
          >
            Submit
          </Button>
        </MyFormControl>
      </MyForm>
    </>
  );
};
