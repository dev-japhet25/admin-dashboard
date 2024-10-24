"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Filter } from "lucide-react";
import api from "@/lib/api";


interface iResults {
  member: string;
  phone_no: string;
  session_id: string;
  service_code: string;
  operator: string;
  branch: string;
  action: string;
  sequence: string;
  status: string;
  created: string;
  gateway: string;
}

interface iPagination {
  total: number;
  page: number;
  pages: number;
  has_next: boolean;
  has_previous: boolean;
}

interface FetchParams {
  token: string | undefined;
  page: number;
  page_size: number;
  date_from?: string; // optional property
  date_end?: string; // optional property
  phone_no?: string; // optional property
}


const UssdMonitor = () => {
  const [data, setData] = useState({
    results: [] as iResults[],
    pagination: { total: 0, page: 1, pages: 1 } as iPagination,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    date_from: "",
    date_end: "",
    phone_no: "",
    page: 1,
    page_size: 10,
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const params: FetchParams = {
      token: process.env.NEXT_PUBLIC_API_TOKEN,
      page: filters.page,
      page_size: filters.page_size,
    };

    if (filters.date_from) params.date_from = filters.date_from;
    if (filters.date_end) params.date_end = filters.date_end;
    if (filters.phone_no) params.phone_no = filters.phone_no;

    try {
      const response = await api.get("/admin/ussd/sessions",  params );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    setFilters({ ...filters, page: 1 });
    fetchData();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  const handlePageSizeChange = (newSize: string) => {
    setFilters({ ...filters, page_size: parseInt(newSize), page: 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Input
          type="date"
          name="date_from"
          value={filters.date_from}
          onChange={handleFilterChange}
          placeholder="Start Date"
        />
        <Input
          type="date"
          name="date_end"
          value={filters.date_end}
          onChange={handleFilterChange}
          placeholder="End Date"
        />
        <Input
          type="text"
          name="phone_no"
          value={filters.phone_no}
          onChange={handleFilterChange}
          placeholder="Phone Number eg. 233234567890"
        />
        <Button
          onClick={handleApplyFilter}
          className="w-full  bg-blue-900 hover:bg-blue-500"
        >
          <Filter className="mr-2 h-4 w-4" /> Apply Filter
        </Button>
      </div>
      {/* 
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-900 text-blue-900"></div>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Phone No</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Service Code</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Gateway</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.results.map((session, index) => (
                <TableRow key={index}>
                  <TableCell>{session.member || "N/A"}</TableCell>
                  <TableCell>{session.phone_no}</TableCell>
                  <TableCell>{session.session_id}</TableCell>
                  <TableCell>{session.service_code}</TableCell>
                  <TableCell>{session.operator}</TableCell>
                  <TableCell>{session.branch || "N/A"}</TableCell>
                  <TableCell>{session.created}</TableCell>
                  <TableCell>{session.gateway}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={!data.pagination.has_previous}
                className="bg-blue-900 text-white"
              >
                Previous
              </Button>
              <span className="px-3">
                Page {data.pagination.page} of {data.pagination.pages}
              </span>
              <Button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={!data.pagination.has_next}
                className="bg-blue-900 text-white "
              >
                Next
              </Button>
            </div>
            <Select
              value={filters.page_size.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Number of Records" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="30">30 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default UssdMonitor;
