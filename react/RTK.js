import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.example.com/",
  }),

  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "employees",
      providesTags: ["Employee"],
    }),

    getEmployeeById: builder.query({
      query: (id) => `employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }],
    }),

    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "employees",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["Employee"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;

import { configureStore } from "@reduxjs/toolkit";
import { employeeApi } from "./employeeApi";

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

import { useGetEmployeesQuery, useAddEmployeeMutation } from "./employeeApi";

function EmployeeList() {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();

  const [addEmployee, { isLoading: isAdding }] = useAddEmployeeMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const handleAdd = async () => {
    await addEmployee({
      name: "John",
      department: "Engineering",
    });
  };

  return (
    <div>
      <button onClick={handleAdd} disabled={isAdding}>
        Add Employee
      </button>

      {employees?.map((employee) => (
        <div key={employee.id}>
          {employee.name} - {employee.department}
        </div>
      ))}
    </div>
  );
}
