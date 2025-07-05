import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signup({ history }) {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
          role: values.role,
        });
        login(registerResponse);
        history.push("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Signup</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  placeholder="Select role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                >
                  <option>admin</option>
                  <option>user</option>
                </Select>
              </FormControl>

              <Button mt="4" width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
