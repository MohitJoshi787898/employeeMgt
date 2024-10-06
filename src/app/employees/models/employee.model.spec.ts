import { Employee } from './employee.model';

describe('Employee Model', () => {
  it('should create an employee object with required properties', () => {
    const employee: Employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      emailId: 'john.doe@example.com',
      mobileNo: '1234567890',
      location: 'New York',
      groupDOJ: '2020-01-01',
      department: 'IT',
      designation: 'Developer',
      DOB: new Date('1990-01-01'),
      birthPlace: 'California',
      bloodGroup: 'A+',
      status: 'Active'
    };

    expect(employee).toBeTruthy();
    expect(employee.firstName).toBe('John');
    expect(employee.lastName).toBe('Doe');
    expect(employee.gender).toBe('Male');
    expect(employee.emailId).toBe('john.doe@example.com');
    expect(employee.mobileNo).toBe('1234567890');
    expect(employee.location).toBe('New York');
    expect(employee.groupDOJ).toBe('2020-01-01');
    expect(employee.department).toBe('IT');
    expect(employee.designation).toBe('Developer');
    expect(employee.DOB).toEqual(new Date('1990-01-01'));
    expect(employee.birthPlace).toBe('California');
    expect(employee.bloodGroup).toBe('A+');
    expect(employee.status).toBe('Active');
  });
});