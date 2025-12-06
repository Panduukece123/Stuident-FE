import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Delete,
  Edit,
  SquareArrowOutUpRight,
  SquareArrowUpRight,
  Trash,
} from "lucide-react";
import React from "react";

export const MyProfile = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className=" w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2 ">
        <h1 className="text-xl">My Profile</h1>
      </div>
      <div className="w-full flex flex-row gap-6">
        <div className="w-3/5 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Biography</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl">
            <p className="font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              doloribus tempore inventore modi magnam, non animi ipsum in facere
              soluta dolorem, ratione laudantium dolores ut consectetur, veniam
              eum excepturi recusandae.
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Education</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            <h3 className="text-xl">Universitas Lorem Ipsum</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="w-24">Major</span>
                <span className="mr-2">:</span>
                <span className="font-light">Infromatika</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Degree</span>
                <span className="mr-2">:</span>
                <span className="font-light">S1</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Experience</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            <h3 className="text-xl">Software Engineering Intern</h3>
            <p className="font-light">
              Developed web applications using Laravel and Vue.js, collaborated
              with senior developers on feature implementation
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="w-24">Type</span>
                <span className="mr-2">:</span>
                <span className="font-light">Internship</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Level</span>
                <span className="mr-2">:</span>
                <span className="font-light">Junior</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Company</span>
                <span className="mr-2">:</span>
                <span className="font-light">PT. Lorem Ipsum</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Start Date</span>
                <span className="mr-2">:</span>
                <span className="font-light">01 Januari 2023</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">End Date</span>
                <span className="mr-2">:</span>
                <span className="font-light">01 Januari 2024</span>
              </div>
              <Button variant="link" className="w-fit px-0 ml-auto">
                See Certificate
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Achievement</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            <h3 className="text-xl">Dean's List Academic Achievement</h3>
            <p className="font-light">
              Achieved Dean\'s List recognition for exceptional academic
              performance with GPA 3.85/4.0
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="w-24">Organization</span>
                <span className="mr-2">:</span>
                <span className="font-light">Universitas Indonesia</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Year</span>
                <span className="mr-2">:</span>
                <span className="font-light">2023</span>
              </div>
              <Button variant="link" className="w-fit px-0 ml-auto">
                See Certificate
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Specialization</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-wrap gap-2">
            <Badge> Web Development </Badge>
            <Badge> Data Science </Badge>
            <Badge> Mobile Development </Badge>
            <Badge> UI/UX Design </Badge>
            <Badge> Cybersecurity </Badge>
            <Badge> Cloud Computing </Badge>
            <Badge> Artificial Intelligence </Badge>
            <Badge> DevOps </Badge>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Attachment</h2>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            <h3 className="text-xl">Curriculum Vitae</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">cv_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="w-24">Size</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">2 MB</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">PDF</span>
                  </div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full">
                <Edit />
                Change
              </Button>
              <Button
                variant="outline"
                className="w-fit px-0 border-red-500 text-red-500 rounded-full"
              >
                <Trash />
                Remove
              </Button>
            </div>

            <h3 className="text-xl">Portfolio</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">portfolio_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="w-24">Size</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">2 MB</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">PDF</span>
                  </div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full">
                <Edit />
                Change
              </Button>
              <Button
                variant="outline"
                className="w-fit px-0 border-red-500 text-red-500 rounded-full"
              >
                <Trash />
                Remove
              </Button>
            </div>

            <h3 className="text-xl">Recommendation Letter</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">
                  recommendation_bima_adnadnita.pdf
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="w-24">Size</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">2 MB</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">PDF</span>
                  </div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full">
                <Edit />
                Change
              </Button>
              <Button
                variant="outline"
                className="w-fit px-0 border-red-500 text-red-500 rounded-full"
              >
                <Trash />
                Remove
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-300 w-2/5 p-4 h-fit flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Profile</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <span className="w-24">Nama</span>
              <span className="mr-2">:</span>
              <span className="font-light">Rina Kartika</span>
            </div>
            <div className="flex items-center">
              <span className="w-24">Gender</span>
              <span className="mr-2">:</span>
              <span className="font-light">Female</span>
            </div>
            <div className="flex items-center">
              <span className="w-24">Birth Date</span>
              <span className="mr-2">:</span>
              <span className="font-light">1990-01-01</span>
            </div>
            <div className="flex items-center">
              <span className="w-24">Phone</span>
              <span className="mr-2">:</span>
              <span className="font-light">08123456789</span>
            </div>
            <div className="flex items-center">
              <span className="w-24">Address</span>
              <span className="mr-2">:</span>
              <span className="font-light">Jl. Jenderal Sudirman</span>
            </div>
          </div>
          <div className="my-2 h-px w-full bg-neutral-200" />
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Education</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <span className="w-24">Institution</span>
              <span className="mr-2">:</span>
              <span className="font-light">Universitas Lorem Ipsum</span>
            </div>
            <div className="flex items-center">
              <span className="w-24">Major</span>
              <span className="mr-2">:</span>
              <span className="font-light">Informatika</span>
            </div>
            <div className="flex items-center">
              <span className="w-24">Degree</span>
              <span className="mr-2">:</span>
              <span className="font-light">S1</span>
            </div>
          </div>
          <div className="my-2 h-px w-full bg-neutral-200" />
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Link</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit />
              Edit
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <a href="https://github.com/rinakartika">Github</a>
            <a href="https://linkedin.com/in/rinakartika">LinkedIn</a>
            <a href="https://portfolio.rinakartika.com">Portfolio</a>
            <a href="https://twitter.com/rinakartika">Twitter</a>
            <a href="https://instagram.com/rinakartika">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};
