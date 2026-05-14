"use client";

import {
  Input,
  Select,
  Table,
  Tooltip,
  ConfigProvider,
  theme,
  Modal,
} from "antd";

import type { ColumnsType, ColumnType } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";

import {
  ArrowLeft,
  Eye,
  ShieldCheck,
  Trash2,
  Search,
  Users,
  Filter,
  RotateCcw,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useDeleteUserMutation, useGetAllPersonQuery } from "@/redux/api/personApi";
import { toast } from "sonner";

const { Option } = Select;

type ExpertiseType = { topic: string; level: string };

type PersonType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  photo_url: string | null;
  is_active: boolean;
  bkash: string | null;
  created_at: string;
  updated_at: string;
  academicInfo: {
    department?: string;
    university?: string;
    term?: string;
    student_id?: string;
    level?: string;
  } | null;
  expertises: ExpertiseType[];
  as_target_user: { ai_rating: number }[];
};

/* ── tiny labeled filter wrapper ── */
const FL = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-0.5">
      {label}
    </span>
    {children}
  </div>
);

/* ── small action button ── */
const ActionBtn = ({
  onClick, icon, color,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  color: "indigo" | "slate" | "red";
}) => {
  const styles = {
    indigo: "bg-indigo-500/20 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/35",
    slate:  "bg-slate-500/20 border-slate-500/30 text-slate-400 hover:bg-slate-500/35",
    red:    "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/35",
  };
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${styles[color]}`}
    >
      {icon}
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const Admin_Dashboard_Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ── pagination ── */
  const [page, setPage]   = useState(Number(searchParams.get("page"))  || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10);

  /* ── draft filter inputs (not yet sent to API) ── */
  const [emailInput,      setEmailInput]      = useState(searchParams.get("email")      || "");
  const [firstNameInput,  setFirstNameInput]  = useState(searchParams.get("first_name") || "");
  const [lastNameInput,   setLastNameInput]   = useState(searchParams.get("last_name")  || "");
  const [departmentInput, setDepartmentInput] = useState(searchParams.get("department") || "");
  const [universityInput, setUniversityInput] = useState(searchParams.get("university") || "");
  const [termInput,       setTermInput]       = useState(searchParams.get("term")       || "");
  const [studentIdInput,  setStudentIdInput]  = useState(searchParams.get("student_id") || "");
  const [levelInput,      setLevelInput]      = useState(searchParams.get("level")      || "");

  /* ── applied filters (sent to API only after Apply) ── */
  const [applied, setApplied] = useState({
    email:      searchParams.get("email")      || "",
    first_name: searchParams.get("first_name") || "",
    last_name:  searchParams.get("last_name")  || "",
    department: searchParams.get("department") || "",
    university: searchParams.get("university") || "",
    term:       searchParams.get("term")       || "",
    student_id: searchParams.get("student_id") || "",
    level:      searchParams.get("level")      || "",
  });

  /* ── sort ── */
  const [sortBy,    setSortBy]    = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  /* ── build query ── */
  const query: Record<string, any> = { sortOrder, sortBy, page, limit };
  if (applied.email)      query.email      = applied.email;
  if (applied.first_name) query.first_name = applied.first_name;
  if (applied.last_name)  query.last_name  = applied.last_name;
  if (applied.department) query.department = applied.department;
  if (applied.university) query.university = applied.university;
  if (applied.term)       query.term       = applied.term;
  if (applied.student_id) query.student_id = applied.student_id;
  if (applied.level)      query.level      = applied.level;

  const { data: personsRes, isLoading } = useGetAllPersonQuery(query);
  const [modal, contextHolder] = Modal.useModal();
  const [deleteUserFnc]=useDeleteUserMutation();

  /* ── normalize response (handles array OR { meta, data } shape) ── */
  const persons: PersonType[] = useMemo(() => {
    if (!personsRes) return [];
    if (Array.isArray(personsRes))      return personsRes;
    if (Array.isArray((personsRes as any)?.data)) return (personsRes as any)?.data;
    return [];
  }, [personsRes]);

  const total: number = (personsRes as any)?.meta?.total ?? persons.length;

  const tableData = useMemo(() =>
    persons.map((p) => {
      const ratings = p?.as_target_user ?? [];
      const avgRating =
        ratings.length > 0
          ? (ratings.reduce((s, r) => s + (r.ai_rating ?? 0), 0) / ratings.length).toFixed(1)
          : null;
      return { key: p.id, ...p, avgRating };
    }),
  [persons]);

  /* ── filter handlers ── */
  const handleApply = () => {
    setApplied({
      email:      emailInput,
      first_name: firstNameInput,
      last_name:  lastNameInput,
      department: departmentInput,
      university: universityInput,
      term:       termInput,
      student_id: studentIdInput,
      level:      levelInput,
    });
    setPage(1);
  };

  const handleReset = () => {
    setEmailInput(""); setFirstNameInput(""); setLastNameInput("");
    setDepartmentInput(""); setUniversityInput(""); setTermInput("");
    setStudentIdInput(""); setLevelInput("");
    setApplied({ email:"", first_name:"", last_name:"", department:"", university:"", term:"", student_id:"", level:"" });
    setPage(1);
  };

  const handleTableChange = (_: any, __: any, sorter: SorterResult<any> | SorterResult<any>[]) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    if (s?.columnKey && s?.order) {
      setSortBy(s.columnKey as string);
      setSortOrder(s.order === "ascend" ? "asc" : "desc");
    }
  };

  const sortable = (key: string): Partial<ColumnType<any>> => ({
    key,
    sorter: true,
    sortOrder: sortBy === key ? (sortOrder === "asc" ? "ascend" : "descend") : undefined,
  });

const handleDeleteUser = (id: string) => {
  modal.confirm({
    title: "Delete User",
    content: "Are you sure you want to delete this user?",
    centered: true,
    okText: "Delete",
    
    cancelText: "Cancel",
    okButtonProps: {
      danger: true,
      className:
        "!bg-red-500 hover:!bg-red-600 !border-none !shadow-lg !shadow-red-500/20",
    },
    cancelButtonProps: {
      className:
        "!bg-slate-800 hover:!bg-slate-700 !text-white !border-white/10",
    },
    className: "peerlearn-delete-modal",
    onOk:async () => {
    const res:any = await deleteUserFnc(id);
    if(res?.data?.status==="success"){
        toast.success("Successfully Delete The User !");
    }else{
        toast.error("There is a server side error");
    }
    },
  });
};

  /* ── columns ── */
  const columns: ColumnsType<any> = [
    {
      title: "User",
      key: "first_name",
      width: 210,
      ...sortable("first_name"),
      render: (_, r) => (
        <div className="flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
            {r.photo_url ? (
              <img src={r.photo_url} alt="av"
                className="w-8 h-8 rounded-lg object-cover border border-white/10" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-indigo-500/20 flex items-center justify-center text-[11px] font-bold text-indigo-300">
                {(r.first_name?.[0] ?? "?").toUpperCase()}
              </div>
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0f1117] ${r.is_active ? "bg-emerald-500" : "bg-red-500"}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate leading-tight">
              {r.first_name} {r.last_name}
            </p>
            <p className="text-[10px] text-slate-500 truncate">{r.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Department",
      key: "department",
      width: 120,
      render: (_, r) => (
        <span className="text-[11px] text-slate-400">
          {r?.academicInfo?.department || <span className="text-slate-700">—</span>}
        </span>
      ),
    },

    {
      title: "University",
      key: "university",
      width: 150,
      render: (_, r) => (
        <span className="text-[11px] text-slate-400">
          {r?.academicInfo?.university || <span className="text-slate-700">—</span>}
        </span>
      ),
    },

    {
      title: "Term",
      key: "term",
      width: 75,
      render: (_, r) => (
        <span className="text-[11px] text-slate-400">
          {r?.academicInfo?.term || <span className="text-slate-700">—</span>}
        </span>
      ),
    },

    {
      title: "Std. ID",
      key: "student_id",
      width: 110,
      render: (_, r) => (
        <span className="text-[11px] text-slate-400">
          {r?.academicInfo?.student_id || <span className="text-slate-700">—</span>}
        </span>
      ),
    },

    {
      title: "Bkash",
      dataIndex: "bkash",
      key: "bkash",
      width: 110,
      render: (v) => (
        <span className="text-[11px] text-slate-400">
          {v || <span className="text-slate-700">—</span>}
        </span>
      ),
    },

    {
      title: "Avg Rating",
      dataIndex: "avgRating",
      key: "avgRating",
      width: 95,
      render: (v) =>
        v ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold text-blue-400">
            ★ {v}
          </span>
        ) : (
          <span className="text-slate-700 text-[11px]">—</span>
        ),
    },

    {
      title: "Expertises",
      key: "expertises",
      width: 230,
      render: (_, r) =>
        r?.expertises?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {r.expertises.map((e: ExpertiseType, i: number) => (
              <span key={i}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold text-purple-400">
                {e.topic}
                <span className="text-purple-700">·</span>
                <span className="text-purple-500 text-[9px]">{e.level}</span>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-slate-700 text-[11px]">—</span>
        ),
    },

    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: 80,
      render: (v) =>
        v ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
            ACTIVE
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400">
            BLOCKED
          </span>
        ),
    },

    {
      title: "Joined",
      dataIndex: "created_at",
      key: "created_at",
      width: 90,
      ...sortable("created_at"),
      render: (v) => (
        <span className="text-[10px] text-slate-500">
          {v ? new Date(v).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) : "—"}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 115,
      render: (_, r) => (
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-slate-800/80 border border-white/5 w-fit">
          <Tooltip title="View Profile">
            <ActionBtn color="indigo" icon={<Eye size={12} />} onClick={() => router.push(`/tutor/${r.email}`)} />
          </Tooltip>
          <Tooltip title="Delete User">
            <ActionBtn color="red" icon={<Trash2 size={12} />} onClick={() => handleDeleteUser(r.user.id)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgContainer:   "transparent",
          colorBgElevated:    "#1a1f2e",
          colorBorder:        "rgba(255,255,255,0.07)",
          colorText:          "#cbd5e1",
          colorTextSecondary: "#64748b",
          colorPrimary:       "#6366f1",
          borderRadius:       8,
          fontSize:           12,
          colorBgBase:        "#0f1117",
          colorFillAlter:     "rgba(255,255,255,0.02)",
          colorFillContent:   "rgba(255,255,255,0.03)",
          colorSplit:         "rgba(255,255,255,0.05)",
        },
        components: {
          Table: {
            headerBg:           "rgba(255,255,255,0.02)",
            headerColor:        "#475569",
            rowHoverBg:         "rgba(99,102,241,0.05)",
            borderColor:        "rgba(255,255,255,0.05)",
            bodySortBg:         "transparent",
            headerSortActiveBg: "rgba(255,255,255,0.03)",
            headerSortHoverBg:  "rgba(255,255,255,0.03)",
          },
          Input: {
            colorBgContainer:    "rgba(255,255,255,0.04)",
            colorBorder:         "rgba(255,255,255,0.08)",
            colorTextPlaceholder:"#334155",
            activeBorderColor:   "#6366f1",
            hoverBorderColor:    "rgba(255,255,255,0.15)",
          },
          Select: {
            colorBgContainer:    "rgba(255,255,255,0.04)",
            colorBorder:         "rgba(255,255,255,0.08)",
            colorTextPlaceholder:"#334155",
            optionSelectedBg:    "rgba(99,102,241,0.15)",
          },
          Pagination: {
            colorText:    "#64748b",
            colorPrimary: "#6366f1",
            itemActiveBg: "rgba(99,102,241,0.15)",
          },
          Tooltip: {
            colorBgSpotlight:    "#1e2130",
            colorTextLightSolid: "#cbd5e1",
          },
        },
      }}
    >
        {contextHolder}
      <div className="min-h-screen p-4 space-y-4">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Users size={16} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">All Users</h1>
              <p className="text-[10px] text-slate-500">{total} {total === 1 ? "person" : "people"} found</p>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-all text-xs font-semibold">
            <ArrowLeft size={13} /> Back
          </button>
        </div>

        {/* ── FILTERS ── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <Filter size={12} className="text-slate-600" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Filters</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mb-3">
            <FL label="Email">
              <Input placeholder="email…" prefix={<Search size={11} className="text-slate-600" />}
                value={emailInput} onChange={(e) => setEmailInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="First Name">
              <Input placeholder="first name…" value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="Last Name">
              <Input placeholder="last name…" value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="Department">
              <Input placeholder="e.g. CSE" value={departmentInput}
                onChange={(e) => setDepartmentInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="University">
              <Input placeholder="e.g. DIU" value={universityInput}
                onChange={(e) => setUniversityInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="Term">
              <Input placeholder="e.g. T1" value={termInput}
                onChange={(e) => setTermInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="Student ID">
              <Input placeholder="e.g. 222-15" value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)} onPressEnter={handleApply} size="small" />
            </FL>
            <FL label="Level">
              <Select placeholder="any…" size="small" value={levelInput || undefined}
                onChange={(v) => setLevelInput(v ?? "")} allowClear className="w-full">
                <Option value="L1">L1</Option>
                <Option value="L2">L2</Option>
                <Option value="L3">L3</Option>
                <Option value="L4">L4</Option>
                <Option value="BEGINNER">BEGINNER</Option>
                <Option value="INTERMEDIATE">INTERMEDIATE</Option>
                <Option value="EXPERT">EXPERT</Option>
              </Select>
            </FL>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleApply}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30 transition-all text-[11px] font-bold">
              <Filter size={11} /> Apply
            </button>
            <button onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-[11px] font-bold">
              <RotateCcw size={11} /> Reset
            </button>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="rounded-2xl border border-white/5 overflow-hidden">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1500 }}
            size="small"
            onChange={handleTableChange}
            pagination={{
              current: page,
              pageSize: limit,
              total,
              onChange: (p, ps) => { setPage(p); setLimit(ps); },
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              showTotal: (t) => <span className="text-[11px] text-slate-500">{t} total users</span>,
              size: "small",
            }}
          />
        </div>

      </div>
    </ConfigProvider>
  );
};

export default Admin_Dashboard_Page;