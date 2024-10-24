"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import api from "@/lib/api";

interface MemberType {
  id: number;
  type_name: string;
  name: string;
}

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  phone_no: string;
  email: string | null;
  branch: {
    name: string;
    church: string;
  };
  member_type: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export default function NonMemberTab() {
  const [memberTypes, setMemberTypes] = useState<MemberType[]>([]);
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pages: 1,
    has_next: false,
    has_previous: false,
  });
  const [searchParams, setSearchParams] = useState({
    phone_no: "",
    first_name: "",
    last_name: "",
    email: "",
    page: 1,
    page_size: 10,
  });
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberType, setSelectedMemberType] = useState<string>("");

  useEffect(() => {
    fetchMemberTypes();
  }, []);

  const fetchMemberTypes = async () => {
    try {
      const response = await api.get("/admin/non_member/member_types/");
      setMemberTypes(response.data);
    } catch (error) {
      console.error("Error fetching member types:", error);
      toast.error("Failed to fetch member types");
    }
  };

  const handleSearch = async (e?: React.FormEvent, page: number = 1) => {
    if (e) e.preventDefault();

    const params = {
      ...searchParams,
      page,
      token: process.env.NEXT_PUBLIC_API_TOKEN,
    };

    try {
      const response = await api.get(
        "/admin/non_member/search_member/",
        params
      );
      setSearchResults(response.data.results);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error searching members:", error);
      toast.error("Failed to search members");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleMemberTypeChange = (value: string) => {
    setSelectedMemberType(value);
  };

  const handleUpdateMember = async () => {
    if (!selectedMember || !selectedMemberType) return;

    try {
      await api.post("/admin/non_member/update_member/", {
        token: process.env.NEXT_PUBLIC_API_TOKEN,
        member_id: selectedMember.id,
        member_type: selectedMemberType,
      });
      toast.success("Member updated successfully");
      setIsModalOpen(false);
      handleSearch(); // Refresh search results
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member");
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
    handleSearch(undefined, newPage);
  };

  const handlePageSizeChange = (newSize: string) => {
    setSearchParams({ ...searchParams, page_size: parseInt(newSize), page: 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={(e) => handleSearch(e)} className="mb-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            name="phone_no"
            placeholder="Phone Number"
            value={searchParams.phone_no}
            onChange={handleInputChange}
          />
          <Input
            name="first_name"
            placeholder="First Name"
            value={searchParams.first_name}
            onChange={handleInputChange}
          />
          <Input
            name="last_name"
            placeholder="Last Name"
            value={searchParams.last_name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={searchParams.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <Button
            type="submit"
            className="text-xs rounded-full bg-blue-900 hover:bg-blue-800 px-10 text-center"
          >
            Search
          </Button>
          <div>
            <Select
              value={searchParams.page_size.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="30">30 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
      {pagination.total > 0 && (
        <p className="text-sm text-blue-500 mt-2">
          Total results: {pagination.total}
        </p>
      )}
      {searchResults.length === 0 ? (
        <p className="text-center text-red-500">Search for Member</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">First Name</TableHead>
                <TableHead className="w-[150px]">Last Name</TableHead>
                <TableHead className="w-[150px]">Phone Number</TableHead>
                <TableHead className="w-[200px]">Email</TableHead>
                <TableHead className="w-[150px]">Branch</TableHead>
                <TableHead className="w-[150px]">Church</TableHead>
                <TableHead className="w-[150px]">Member Type</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.first_name}</TableCell>
                  <TableCell>{member.last_name}</TableCell>
                  <TableCell>{member.phone_no}</TableCell>
                  <TableCell>{member.email || "N/A"}</TableCell>
                  <TableCell>{member.branch.name}</TableCell>
                  <TableCell>{member.branch.church}</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                      {member.member_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleMemberSelect(member)}
                      className="text-xs rounded-full bg-blue-900 hover:bg-blue-800"
                    >
                      <p className="text-xs">Update</p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex justify-center">
        {pagination.total > 0 && (
          <div className="mt-4 bg-blue-900 w-1/2 text-white rounded-full">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(pagination.page - 1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  Page {pagination.page} of {pagination.pages}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(pagination.page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Member Type</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <p>
                Name: {selectedMember.first_name} {selectedMember.last_name}
              </p>
              <p>Current Member Type: {selectedMember.member_type}</p>
              <Select
                onValueChange={handleMemberTypeChange}
                value={selectedMemberType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Member Type" />
                </SelectTrigger>
                <SelectContent>
                  {memberTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateMember} disabled={!selectedMemberType}>
              Update Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
