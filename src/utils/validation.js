export function validateForm({name, email, message }) {
    const errors = { };
    if(!name.trim()) {
        errors.name = "name required";
    }

    if(!email.trim()) {
        errors.email = "email required";
    }

    if(!message.trim()) {
        errors.message = "message shouldn't be empty"
    }

    return errors;
}