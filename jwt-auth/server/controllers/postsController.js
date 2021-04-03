const posts = [
	{
		username: 'Kyle',
		title: 'Post 1',
	},
	{
		username: 'Jim',
		title: 'Post 2',
	},
];

export const posts_get = (req, res) => {
	res.json(posts);
};
