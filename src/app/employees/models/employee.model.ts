export interface Employee {
  id: number;
  firstName: string,
  lastName: string,
  gender: string;
  emailId: string,
  mobileNo: string,
  location: string;
  groupDOJ: Date;
  department: string,
  designation: string,
  DOB: Date,
  birthPlace: string,
  bloodGroup: 'B+' | 'A+' | 'AB+' | 'O+' | 'B-' | 'A-' | 'AB-' | 'O-';
  status: 'Active' | 'Inactive' | 'Draft';
}