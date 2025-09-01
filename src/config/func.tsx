import { Alert } from "react-native";

export const toastSuccess = (s: string) => {
    Alert.alert(s);
};

export const toastWarning = (s: string) => {
    Alert.alert(s);
};

export const toastError = (error: any,message?: string) => {
    if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;

        Object.keys(errors).forEach((field) => {
            const messages = errors[field];

            if (Array.isArray(messages)) {
                messages.forEach((msg: string) => Alert.alert(msg));
            } else if (typeof messages === 'string') {
                Alert.alert(messages);
            }
        });
        if (error.response.data.log) {
          console.log(error.response.data.log);
        }
    } else {
        Alert.alert(message??'Lỗi code!!!');
    }
};

export const showError = (error: any, message?: string) => {
    if (error.response.status === 429) 
        Alert.alert("Không được spam!!!")
    else
        toastError(error, message);
}

export const isToday = (dateString?: string | undefined) => {
    if (!dateString) return false;
    const updatedDate = new Date(dateString);
    const today = new Date();

    return (
        updatedDate.getFullYear() === today.getFullYear() &&
        updatedDate.getMonth() === today.getMonth() &&
        updatedDate.getDate() === today.getDate()
    );
};

export const showSalary = (job: any) => {
    if (job.min_salary && job.max_salary) {
      return `${job.min_salary} - ${job.max_salary} ${job.type_salary == "USD" ? "USD" : "triệu"}`;
    } else if (job.min_salary) {
      return  `${job.min_salary} ${job.type_salary}`;
    } else if (job.max_salary) {
      return  `${job.max_salary} ${job.type_salary}`;
    } else {
      return  'Thỏa thuận';
    }
}