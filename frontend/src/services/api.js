export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const getToken = () => {
  const admin = localStorage.getItem("hn_admin") || sessionStorage.getItem("hn_admin");
  const user  = localStorage.getItem("hn_user")  || sessionStorage.getItem("hn_user");
  const parsed = admin ? JSON.parse(admin) : user ? JSON.parse(user) : null;
  return parsed?.token || null;
};

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res  = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const authAPI = {
  register:       (body)           => request("/auth/register",        { method: "POST", body: JSON.stringify(body) }),
  login:          (body)           => request("/auth/login",           { method: "POST", body: JSON.stringify(body) }),
  forgotPassword: (email)          => request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  resetPassword:  (token, password)=> request(`/auth/reset-password/${token}`, { method: "POST", body: JSON.stringify({ password }) }),
  getMe:          ()               => request("/auth/me"),
  changePassword: (body)           => request("/auth/change-password", { method: "PUT",  body: JSON.stringify(body) }),
};

export const doctorAPI = {
  getAll:  (params = "") => request(`/doctors${params}`),
  getById: (id)          => request(`/doctors/${id}`),
  create:  (body)        => request("/doctors",     { method: "POST",   body: JSON.stringify(body) }),
  update:  (id, body)    => request(`/doctors/${id}`, { method: "PUT",  body: JSON.stringify(body) }),
  delete:  (id)          => request(`/doctors/${id}`, { method: "DELETE" }),
};

export const appointmentAPI = {
  book:         (body)        => request("/appointments",              { method: "POST", body: JSON.stringify(body) }),
  getAll:       (params = "") => request(`/appointments${params}`),
  updateStatus: (id, status)  => request(`/appointments/${id}/status`, { method: "PUT",  body: JSON.stringify({ status }) }),
  reschedule:   (id, body)    => request(`/appointments/${id}/reschedule`, { method: "PUT", body: JSON.stringify(body) }),
  delete:       (id)          => request(`/appointments/${id}`,        { method: "DELETE" }),
};

export const patientAPI = {
  getAll:        (params = "") => request(`/patients${params}`),
  getProfile:    ()            => request("/patients/profile"),
  updateProfile: (body)        => request("/patients/profile",   { method: "PUT",    body: JSON.stringify(body) }),
  delete:        (id)          => request(`/patients/${id}`,     { method: "DELETE" }),
  updateStatus:  (id, status)  => request(`/patients/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};

export const contactAPI = {
  submit:       (body)        => request("/contact",              { method: "POST", body: JSON.stringify(body) }),
  getAll:       (params = "") => request(`/contact${params}`),
  updateStatus: (id, status)  => request(`/contact/${id}/status`, { method: "PUT",  body: JSON.stringify({ status }) }),
};

export const billAPI = {
  getAll:   (params = "") => request(`/bills${params}`),
  getById:  (id)          => request(`/bills/${id}`),
  pay:      (id, paymentMethod) => request(`/bills/${id}/pay`,  { method: "PUT", body: JSON.stringify({ paymentMethod }) }),
  update:   (id, body)    => request(`/bills/${id}`,            { method: "PUT", body: JSON.stringify(body) }),
  getStats: ()            => request("/bills/stats"),
};

export const dashboardAPI = {
  get: () => request("/dashboard"),
};
