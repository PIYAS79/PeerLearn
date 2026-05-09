type ExpertiseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

type Expertise = {
  topic: string;
  level: ExpertiseLevel;
};

type AcademicInfo = {
  department: string;
};

export type Teacher_Type = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  is_active: boolean;
  bkash: string | null;
  created_at: string;
  updated_at: string;

  academicInfo: AcademicInfo | null;

  expertises: Expertise[];
};

export type Get_All_Teachers_Response_Type = {
  status: string;
  message: string;
  data: Teacher_Type[];
};