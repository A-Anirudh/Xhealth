export const userDetails = (lang) => ({
	personal: [
		{
			name: lang.fname,
			id: "firstName",
			type: "text",
			disabled: "",
		},
		{
			name: lang.lname,
			id: "lastName",
			type: "text",
			disabled: "",
		},
		{
			name: lang.dob,
			id: "dateOfBirth",
			type: "date",
			disabled: "",
		},
		{
			name: lang.bg,
			id: "bloodGroup",
			type: "text",
			disabled: "disabled",
		},
		{
			name: lang.gender,
			id: "gender",
			type: "text",
			disabled: "disabled",
		},
	],
	contact: [
		{
			name: lang.email,
			id: "email",
			type: "email",
			disabled: "disabled",
		},
		{
			name: lang.phone,
			id: "phoneNumber",
			type: "number",
			disabled: "",
		},
		{
			name: lang.state,
			id: "state",
			type: "text",
			disabled: "",
		},
		{
			name: lang.city,
			id: "city",
			type: "text",
			disabled: "",
		},
		{
			name: lang.pincode,
			id: "pincode",
			type: "number",
			disabled: "",
		},
	],
});
