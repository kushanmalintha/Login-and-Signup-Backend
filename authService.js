const bcrypt = require('bcryptjs');

const { createUser, findUserByEmail } = require('./userController');
const { signupDetailsSchema } = require('./authMiddleware');

const signUp = async (username, email, password) => {
    try {
        // Combine the parameters into an object
        const userDetails = { username, email, password };

        // Validate the request body against the schema
        const { error } = signupDetailsSchema.validate(userDetails);
        if (error) {
            console.error('Validation error:', error.details[0].message);
            throw new Error('Invalid email or password');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(username, email, hashedPassword);

        return { id:userId ,username, email, password };
    } catch (err) {
        console.error('Error during sign up:', err.message);
        throw err;
    }
};

const login = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        console.log("login", await bcrypt.hash(password, 10),user.password);
        
        throw new Error('Invalid email or password');
    }

};

module.exports = { signUp, login };
