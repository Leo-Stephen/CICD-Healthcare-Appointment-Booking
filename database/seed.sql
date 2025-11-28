-- Healthcare Appointment Management System - Seed Data
-- Sample data for development and demo

-- Insert Admin User (password: admin123)
INSERT INTO users (email, password, full_name, phone, role) VALUES
('admin@healthcare.com', '$2a$10$ZWt0hmR/5pUeJvLi4g9pJ.UrBfHYcjg2Ssgj1zY.wFLzeR3MALfIm', 'System Administrator', '+1-555-0001', 'ADMIN');

-- Insert Patient Users (password: patient123)
INSERT INTO users (email, password, full_name, phone, role) VALUES
('john.doe@email.com', '$2a$10$0f8Td4jADLK9JcwgH0au5eYvFSpAIN2msJM7QC4VciSO7lzlwRnkS', 'John Doe', '+1-555-0101', 'PATIENT'),
('jane.smith@email.com', '$2a$10$0f8Td4jADLK9JcwgH0au5eYvFSpAIN2msJM7QC4VciSO7lzlwRnkS', 'Jane Smith', '+1-555-0102', 'PATIENT'),
('mike.wilson@email.com', '$2a$10$0f8Td4jADLK9JcwgH0au5eYvFSpAIN2msJM7QC4VciSO7lzlwRnkS', 'Mike Wilson', '+1-555-0103', 'PATIENT');

-- Insert Doctor Users (password: doctor123)
INSERT INTO users (email, password, full_name, phone, role) VALUES
('dr.sarah.johnson@healthcare.com', '$2a$10$8nLe5rNHLfE/bTAyY9nYlei0Uw94sQSrWXjWkrA29aF.8It.6p5Qu', 'Dr. Sarah Johnson', '+1-555-0201', 'DOCTOR'),
('dr.michael.chen@healthcare.com', '$2a$10$8nLe5rNHLfE/bTAyY9nYlei0Uw94sQSrWXjWkrA29aF.8It.6p5Qu', 'Dr. Michael Chen', '+1-555-0202', 'DOCTOR'),
('dr.emily.davis@healthcare.com', '$2a$10$8nLe5rNHLfE/bTAyY9nYlei0Uw94sQSrWXjWkrA29aF.8It.6p5Qu', 'Dr. Emily Davis', '+1-555-0203', 'DOCTOR'),
('dr.robert.martinez@healthcare.com', '$2a$10$8nLe5rNHLfE/bTAyY9nYlei0Uw94sQSrWXjWkrA29aF.8It.6p5Qu', 'Dr. Robert Martinez', '+1-555-0204', 'DOCTOR'),
('dr.lisa.anderson@healthcare.com', '$2a$10$8nLe5rNHLfE/bTAyY9nYlei0Uw94sQSrWXjWkrA29aF.8It.6p5Qu', 'Dr. Lisa Anderson', '+1-555-0205', 'DOCTOR');

-- Insert Doctor Details
INSERT INTO doctors (user_id, specialization, qualification, experience_years, consultation_fee, bio, rating, total_reviews) VALUES
-- Dr. Sarah Johnson - Cardiology
(5, 'Cardiology', 'MD, FACC', 15, 150.00, 'Board-certified cardiologist with expertise in preventive cardiology and heart disease management. Committed to providing compassionate, patient-centered care.', 4.8, 127),
-- Dr. Michael Chen - Dermatology
(6, 'Dermatology', 'MD, Dermatology', 10, 120.00, 'Specialized in medical and cosmetic dermatology. Expert in treating skin conditions, acne, eczema, and anti-aging treatments.', 4.9, 203),
-- Dr. Emily Davis - Pediatrics
(7, 'Pediatrics', 'MD, FAAP', 12, 100.00, 'Dedicated pediatrician focused on child health and development. Creating a warm, friendly environment for children and families.', 4.7, 156),
-- Dr. Robert Martinez - Orthopedics
(8, 'Orthopedics', 'MD, MS (Orthopedics)', 18, 180.00, 'Orthopedic surgeon specializing in sports medicine, joint replacement, and fracture care. Using latest minimally invasive techniques.', 4.6, 98),
-- Dr. Lisa Anderson - General Medicine
(9, 'General Medicine', 'MBBS, MD', 8, 80.00, 'General physician providing comprehensive primary care. Focus on preventive medicine and chronic disease management.', 4.5, 189);

-- Insert Doctor Schedules (Weekly availability)
-- Dr. Sarah Johnson - Monday to Friday, 9 AM to 5 PM
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES
(1, 1, '09:00:00', '17:00:00', 30),
(1, 2, '09:00:00', '17:00:00', 30),
(1, 3, '09:00:00', '17:00:00', 30),
(1, 4, '09:00:00', '17:00:00', 30),
(1, 5, '09:00:00', '17:00:00', 30);

-- Dr. Michael Chen - Monday, Wednesday, Friday, 10 AM to 6 PM
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES
(2, 1, '10:00:00', '18:00:00', 30),
(2, 3, '10:00:00', '18:00:00', 30),
(2, 5, '10:00:00', '18:00:00', 30);

-- Dr. Emily Davis - Tuesday to Saturday, 8 AM to 4 PM
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES
(3, 2, '08:00:00', '16:00:00', 30),
(3, 3, '08:00:00', '16:00:00', 30),
(3, 4, '08:00:00', '16:00:00', 30),
(3, 5, '08:00:00', '16:00:00', 30),
(3, 6, '08:00:00', '16:00:00', 30);

-- Dr. Robert Martinez - Monday to Friday, 11 AM to 7 PM
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES
(4, 1, '11:00:00', '19:00:00', 45),
(4, 2, '11:00:00', '19:00:00', 45),
(4, 3, '11:00:00', '19:00:00', 45),
(4, 4, '11:00:00', '19:00:00', 45),
(4, 5, '11:00:00', '19:00:00', 45);

-- Dr. Lisa Anderson - Monday to Saturday, 9 AM to 5 PM
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES
(5, 1, '09:00:00', '17:00:00', 20),
(5, 2, '09:00:00', '17:00:00', 20),
(5, 3, '09:00:00', '17:00:00', 20),
(5, 4, '09:00:00', '17:00:00', 20),
(5, 5, '09:00:00', '17:00:00', 20),
(5, 6, '09:00:00', '17:00:00', 20);

-- Insert Sample Appointments (with various statuses)
-- Approved appointment
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES
(2, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), '10:00:00', 'APPROVED', 'Regular heart checkup');

-- Pending appointment
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES
(3, 2, DATE_ADD(CURDATE(), INTERVAL 5 DAY), '14:00:00', 'PENDING', 'Skin rash consultation');

-- Approved appointment
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES
(4, 3, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '09:30:00', 'APPROVED', 'Child vaccination');

-- Completed appointment
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason, notes) VALUES
(2, 5, DATE_SUB(CURDATE(), INTERVAL 10 DAY), '11:00:00', 'COMPLETED', 'Annual physical exam', 'Patient healthy. Recommended regular exercise.');

-- Cancelled appointment
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES
(3, 4, DATE_ADD(CURDATE(), INTERVAL 7 DAY), '15:00:00', 'CANCELLED', 'Knee pain evaluation');

-- Sample Notifications
INSERT INTO notifications (user_id, type, title, message, reference_id) VALUES
(2, 'APPOINTMENT_APPROVED', 'Appointment Confirmed', CONCAT('Your appointment with Dr. Sarah Johnson has been approved for ', DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 DAY), '%Y-%m-%d'), ' at 10:00 AM'), 1),
(3, 'APPOINTMENT_PENDING', 'Appointment Requested', 'Your appointment request with Dr. Michael Chen is pending approval', 2),
(5, 'NEW_APPOINTMENT_REQUEST', 'New Appointment Request', CONCAT('John Doe has requested an appointment on ', DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 DAY), '%Y-%m-%d'), ' at 10:00 AM'), 1);
