export const doctorDetails = (lang) => ({
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
		{
			name: lang.qualification,
			id: "qualification",
			type: "text",
			disabled: "",
		},
		{
			name: lang.rNo,
			id: "registrationNumber",
			type: "text",
			disabled: "disabled",
		},
		{
			name: lang.college,
			id: "gradCollegeName",
			type: "text",
			disabled: "",
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

	work: [
		{
			name: lang.department,
			id: "department",
			type: "text",
			disabled: "",
		},
		{
			name: lang.startHour,
			id: "workingHourStart",
			type: "time",
			disabled: "",
		},
		{
			name: lang.endHour,
			id: "workingHourEnd",
			type: "time",
			disabled: "",
		},
		{
			name: lang.hospital,
			id: "currentHospitalWorkingName",
			type: "text",
			disabled: "",
		},

		{
			name: lang.experience,
			id: "experience",
			type: "text",
			disabled: "",
		},
	],
});

export const doctorSignupDetails = (lang) => [
	{
		name: "firstName",
		type: "text",
		label: lang.fname,
	},
	{
		name: "lastName",
		type: "text",
		label: lang.lname,
	},
	{
		name: "password",
		type: "password",
		label: lang.password,
	},

	{
		name: "email",
		type: "email",
		label: lang.email,
	},
	{
		name: "phoneNumber",
		type: "tel",
		label: lang.phone,
	},
	{
		name: "dateOfBirth",
		type: "date",
		label: lang.dob,
	},
	{
		name: "state",
		type: "text",
		label: lang.state,
	},
	{
		name: "city",
		type: "text",
		label: lang.city,
	},
	{
		name: "pincode",
		type: "text",
		label: lang.pincode,
	},
	{
		name: "gender",
		type: "text",
		label: lang.gender.label,
	},
	{
		name: "bloodGroup",
		type: "text",
		label: lang.bg.label,
	},
	{
		name: "department",
		type: "text",
		label: lang.department,
	},
	{
		name: "qualification",
		type: "text",
		label: lang.qualification,
	},
	{
		name: "gradCollegeName",
		type: "text",
		label: lang.college,
	},
	{
		name: "workingHourStart",
		type: "time",
		label: lang.startHour,
	},
	{
		name: "workingHourEnd",
		type: "time",
		label: lang.endHour,
	},
	{
		name: "experience",
		type: "text",
		label: lang.experience,
	},
	{
		name: "currentHospitalWorkingName",
		type: "text",
		label: lang.hospital,
	},
	{
		name: "registrationNumber",
		type: "text",
		label: lang.rNo,
	},
];
