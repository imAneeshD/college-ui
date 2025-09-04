export interface StudentCreate {
    fullName: string;
    email: string;
    mobile: string;
    dateOfBirth: string;
    address: string;
    course: string;
    marksFile?: File;
}