export const ScreenPermission = {
  alumno: ["Main", "PasswordChange"],
  administrativo: ["Main", "Students", "PasswordChange", "Degree", "StudyPlan", "Professor", "Subject"],
  administrador: ["Main", "Roles", "Users", "Shift", "TestType", "PursueType", "PasswordBlank"],
};

export const LanguageTitles = {
  titles: ["Name", "Surname", "Identitynumber", "Active", "Role", "Type", "Email", "Code", "Degree", "State", "Professor", "Shift", "Pursuetype", "Credithours", "Days", "From", "To", "Subjects", "Address", "Phone", "Arrears"],
  titulos: ["Nombre", "Apellido", "Dni", "Estado", "Rol", "Tipo", "Email", "Codigo", "Carrera", "Estado", "Profesor", "Turno", "Modalidad", "Carga Hs", "Dias", "Desde", "Hasta", "Materias", "Domicilio", "Telefono", "Adeuda"],
};

export const DaysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

export const CreditHours = ["2", "4", "6", "8"];

export const YearTertiary = ["1", "2", "3"];

export const YearUniversity = ["1", "2", "3", "4", "5"];
