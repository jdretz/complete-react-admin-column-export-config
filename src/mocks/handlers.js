import { rest } from 'msw';

if (!localStorage.getItem('forms')) {
    localStorage.setItem('forms', JSON.stringify([
        {
            id: 1,
            title: "Basic Info",
            questions: [
                {
                    id: 1,
                    text: 'What is your name?'
                },
                {
                    id: 2,
                    text: 'Where are you from?'
                },
                {
                    id: 3,
                    text: 'What is your occupation?'
                }
            ]
        },
        {
            id: 2,
            title: "Favorites",
            questions: [
                {
                    id: 1,
                    text:'Whats your favorite color?'
                },
                {
                    id: 2,
                    text:'What is your favorite book?'
                },
                {
                    id: 3,
                    text:'What is your favorite movie?'
                }
            ]
        }
    ]))
}

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        {
            id: 1,
            name: "John",
            occupation: "Developer",
            address: {
                streetAddress:"",
                apt: "",
                city: "",
                state: "",
                zipcode: ""
            },
            hobbies: [
                {
                    id: 1,
                    hobby: "scrolling Instagram"
                }
            ]
        }
    ]))
}

const getUsers = () => {
    let users = localStorage.getItem('users');
    return JSON.parse(users);
}

const getForms = () => {
    let forms = localStorage.getItem('forms');
    return JSON.parse(forms)
}

export const handlers = [
    rest.get('/forms', (req, res, ctx) => {
        let forms = getForms()
        return res(
            ctx.status(200),
            ctx.set('content-range', forms.length),
            ctx.json(forms)
        )
    }),
    rest.get('/forms/:id', async (req, res, ctx) => {
        let forms = getForms()
        let { id } = req.params;

        const match = await forms.find(ques => ques.id == id)

        return res(
            ctx.status(200),
            ctx.json(match)
        )
    }),
    rest.post('/forms', (req, res, ctx) => {
        let forms = getForms();
        const newForm = req.body;
        const newFormArray = [...forms, newForm];

        localStorage.setItem('forms', JSON.stringify(newFormArray));
        return res(
            ctx.status(201),
            ctx.json(newForm)
        )
    }),
    rest.put('/forms/:id', async (req, res, ctx) => {
        let forms = getForms();
        const { id } = req.params;
        const updatedForm = req.body;
        const index = await forms.findIndex(form => form.id === Number(id))
        const oldForm = forms[index];

        const newForm = {...oldForm, ...updatedForm}
        forms.splice(index, 1, newForm);
        localStorage.setItem('forms', JSON.stringify(forms));

        return res(
            ctx.status(202),
            ctx.json(newForm)
        )
    }),
    rest.delete('/forms/:id', async (req, res, ctx) => {
        let forms = getForms();
        const { id } = req.params;
        const newFormArray = await forms.filter(ques => ques.id != id);

        localStorage.setItem('forms', JSON.stringify(newFormArray));

        return res(
            ctx.status(202),
            ctx.json({
                id
            })
        )
    }),
    rest.get('/users', (req, res, ctx) => {
        let users = getUsers()
        return res(
            ctx.status(200),
            ctx.set('content-range', users.length),
            ctx.json(users)
        )
    }),
    rest.get('/users/:id', async (req, res, ctx) => {
        let users = getUsers()
        let { id } = req.params;

        const match = await users.find(ques => ques.id == id)

        return res(
            ctx.status(200),
            ctx.json(match)
        )
    }),
    rest.post('/users', (req, res, ctx) => {
        let users = getUsers();
        const newForm = req.body;
        const newFormArray = [...users, newForm];

        localStorage.setItem('users', JSON.stringify(newFormArray));
        return res(
            ctx.status(201),
            ctx.json(newForm)
        )
    }),
    rest.put('/users/:id', async (req, res, ctx) => {
        let users = getUsers();
        const { id } = req.params;
        const updatedForm = req.body;
        const index = await users.findIndex(form => form.id === Number(id))
        const oldForm = users[index];

        const newForm = {...oldForm, ...updatedForm}
        users.splice(index, 1, newForm);
        localStorage.setItem('users', JSON.stringify(users));

        return res(
            ctx.status(202),
            ctx.json(newForm)
        )
    }),
    rest.delete('/users/:id', async (req, res, ctx) => {
        let users = getUsers();
        const { id } = req.params;
        const newFormArray = await users.filter(ques => ques.id != id);

        localStorage.setItem('users', JSON.stringify(newFormArray));

        return res(
            ctx.status(202),
            ctx.json({
                id
            })
        )
    })
]