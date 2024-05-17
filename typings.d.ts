interface Message {
	text: string;
	createdAt: admin.firestore.Timestamp;
	user: {
		_id: string;
		name: string;
		avatar: string;
	};
}

type Model = {
	id: string;
	object: "model";
	created: number;
	owned_by: "system" | "openai" | "openai-internal";
};

type Models = {
	object: "list";
	data: Model[];
};
