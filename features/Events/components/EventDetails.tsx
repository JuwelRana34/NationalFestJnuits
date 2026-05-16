import { SingleEventPageProps } from "@/app/(main)/events/[id]/page";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Calendar,
  ChevronLeft,
  Clock,
  Contact,
  MailIcon,
  MapPin,
  PhoneCall,
  Ticket,
  Trophy,
  User2Icon,
  UserCircle,
  Users,
} from "lucide-react";

import {
  AnimatedContainer,
  AnimatedItem,
} from "@/components/custom/DynamicMotion";
import MarkdownWrapper from "@/components/custom/MarkDownWraper";
import RegistrationButton from "@/features/payments/Components/TestPayments";
import { SegmentType } from "@/features/payments/types";
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import { honoFetch } from "@/lib/hono-client";
import Image from "next/image";
import Link from "next/link";
import { ResponsiblePerson, SingleEventResponse } from "../schema";

export default async function SegmentDetailsPage({
  params,
}: SingleEventPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { status, response } = await honoFetch<SingleEventResponse>(
    `/api/events/${id}`,
    {
      next: { revalidate: 3600 }, 
    },
  );

  if (status !== 200 || !response?.success) {
    return (
      <div className="pt-20 flex min-h-screen justify-center items-center rounded">
        Event not found!
      </div>
    );
  }
  const segment = Array.isArray(response?.data) ? null : response?.data;

  const occupancyPercentage =
    !segment?.seatsTotal || segment.seatsTotal <= 0
      ? 0
      : Math.round(((segment.seatsFilled ?? 0) / segment.seatsTotal) * 100);

  return (
    <>
      {segment ? (
        <div className="min-h-screen pt-20 bg-background font-sans">
          <header className="bg-slate-900/50  ">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link
                href="/events"
                className="flex items-center justify-center text-secondary hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 " />
                Back to Events
              </Link>
              {/* </Button> */}
              <div className="hidden md:block text-sm text-primary font-medium">
                {/* Displaying the dynamic ID from the URL */}
                Event ID: {segment?.id || ""}
              </div>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8">
            <AnimatedContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Hero Image */}
                {segment?.image && (
                  <AnimatedItem className="overflow-hidden rounded-md border border-slate-800 shadow-md shadow-slate-700">
                    <Image
                      src={segment.image}
                      alt={segment.title}
                      className="w-full aspect-21/9 object-cover transition-transform duration-700 hover:scale-105"
                      height={500}
                      width={1200}
                      unoptimized
                    />
                  </AnimatedItem>
                )}

                {/* Title & Badges */}
                <AnimatedItem className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {segment?.type && (
                      <Badge className="text-slate-800 bg-secondary">
                        {segment.type}
                      </Badge>
                    )}
                    {segment?.isTeamEvent ? (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                      >
                        Team Event
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Solo Event</Badge>
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient">
                      {segment?.title}
                    </h1>
                    {segment?.subtitle && (
                      <p className="mt-2 text-xl text-slate-300">
                        {segment?.subtitle}
                      </p>
                    )}
                  </div>
                </AnimatedItem>

                <Separator className="bg-slate-600" />

                {/* Description */}
                <AnimatedItem className="space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight ">
                    About this Segment
                  </h2>
                  <div className="prose max-w-none leading-relaxed text-slate-200">
                    <MarkdownWrapper content={segment?.description || ""} />
                  </div>
                </AnimatedItem>

                {/* Team Guidelines */}
                {segment?.isTeamEvent && (
                  <AnimatedItem>
                    <Card className="p-6 bg-slate-800 border-none shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-md">
                          <Users className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg text-secondary font-semibold mb-2">
                            Team Requirements
                          </h3>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Team Size: {segment?.minMembers} to{" "}
                              {segment?.maxMembers} members
                            </li>
                            {segment?.extraMemberFee ||
                              (0 > 0 && (
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  Additional Fee per extra member: $
                                  {segment?.extraMemberFee?.toFixed(2)}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </AnimatedItem>
                )}

                {/* Organizers */}
                {Array.isArray(segment?.responsible) &&
                  segment.responsible.length > 0 && (
                    <AnimatedItem className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tight text-secondary">
                        Organizers & Contacts
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {segment.responsible.map(
                          (person: ResponsiblePerson, index: number) => (
                            <Card
                              key={index}
                              className="p-4 flex items-center gap-4 bg-slate-800 border-none"
                            >
                              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-secondary">
                                <UserCircle className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-medium text-lg text-gradient pl-6">
                                  {person.name}
                                </p>
                                <p className="text-xs text-slate-300 flex items-center gap-1">
                                  <PhoneCall className=" h-5 w-5 mt-1" />{" "}
                                  {person.phone ? (
                                    <a
                                      href={`tel:${person.phone}`}
                                      className="text-blue-400 hover:underline"
                                    >
                                      {person.phone}
                                    </a>
                                  ) : null}
                                </p>
                                <p className="text-xs text-slate-300 flex items-center gap-1">
                                  {person.email ? (
                                    <>
                                      <MailIcon className="w-5 h-5 mt-1" />
                                      <a
                                        href={`mailto:${person.email}`}
                                        className="text-blue-400 hover:underline"
                                      >
                                        {person.email}
                                      </a>{" "}
                                    </>
                                  ) : null}
                                </p>
                                {person.socialLink && (
                                  <p className="text-xs text-slate-300 flex items-center gap-1">
                                    <Contact className="w-5 h-5 mt-1" />{" "}
                                    <a
                                      href={person.socialLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:underline"
                                    >
                                      Social Profile
                                    </a>
                                  </p>
                                )}
                                <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                                  <User2Icon className="w-5 h-5" /> Role:{" "}
                                  {person.role}
                                </p>
                              </div>
                            </Card>
                          ),
                        )}
                      </div>
                    </AnimatedItem>
                  )}
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedItem className="sticky top-24">
                  <Card className="overflow-hidden border-border shadow-lg pt-0 bg-slate-800">
                    {/* Highlight/Pricing Header */}
                    <div className="bg-secondary/10 p-6 border-b border-border">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="text-sm font-medium text-slate-300 mb-1">
                            Registration Fee
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-secondary">
                              {segment?.fee ? `$${segment.fee}` : "Free"}
                            </span>
                          </div>
                        </div>
                        {(segment?.prizeMoney ?? 0) > 0 ? (
                          <div className="text-right">
                            <p className="text-md font-medium text-slate-300 mb-1 flex items-center justify-end gap-1">
                              {" "}
                              Prize Pool
                            </p>
                            <span className="text-lg font-bold text-gradient">
                              $ {segment?.prizeMoney?.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <div className="text-right">
                            <p className="text-xs font-medium text-slate-300 mb-1 flex items-center justify-end gap-1">
                              <Trophy className="w-8 h-8 text-secondary" />{" "}
                              Prize Pool
                            </p>
                            <span className="text-lg font-bold text-rose-400">
                              Not Announced!
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-secondary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm text-slate-300">
                              Registration Deadline
                            </p>
                            <p className="text-sm text-slate-300">
                              {formatDate(segment?.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-secondary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm text-slate-300">
                              Time
                            </p>
                            <p className="text-sm text-slate-300">
                              {formatTime(
                                segment?.time
                                )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm text-slate-300">
                              Venue
                            </p>
                            <p className="text-sm text-slate-300">
                              {segment?.venue || "TBA"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Seat Progress */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium flex items-center text-secondary gap-2">
                            <Ticket className="w-4 h-4 text-secondary" />
                            Availability
                          </span>
                          <span className="text-slate-300 font-medium">
                            {segment?.seatsFilled} / {segment?.seatsTotal}
                          </span>
                        </div>
                        <Progress
                          value={occupancyPercentage}
                          className="h-2 "
                        />
                        {occupancyPercentage >= 100 ? (
                          <p className="text-xs text-destructive flex items-center gap-1 font-medium mt-2">
                            <AlertCircle className="w-3 h-3" /> Fully Booked
                          </p>
                        ) : occupancyPercentage >= 80 ? (
                          <p className="text-xs text-secondary flex items-center gap-1 font-medium mt-2">
                            <AlertCircle className="w-3 h-3" /> Filling fast!
                            Only{" "}
                            {segment?.seatsTotal && segment?.seatsFilled
                              ? segment.seatsTotal - segment.seatsFilled
                              : 0}{" "}
                            seats left.
                          </p>
                        ) : null}
                      </div>

                      {/* Call to Action */}
                      {/* <Button
                    className="w-full py-6 text-base shadow-md"
                    disabled={occupancyPercentage >= 100}
                  >
                    {occupancyPercentage >= 100 ? "Sold Out" : "Register Now"}
                  </Button> */}
                      <RegistrationButton
                        minMembers={segment?.minMembers || undefined}
                        maxMembers={segment?.maxMembers || undefined}
                        extraMemberFee={segment?.extraMemberFee || undefined}
                        segmentId={segment?.id || ""}
                        segmentName={segment?.title || "Event"}
                        segmentCategory={segment?.type || "General"}
                        isTeamEvent={segment?.isTeamEvent || false}
                        baseFee={segment?.fee || 0}
                        segmentType={
                          (segment?.type as SegmentType) || "DEFAULT"
                        }
                      />
                    </div>
                  </Card>
                </AnimatedItem>
              </div>
            </AnimatedContainer>
          </main>
        </div>
      ) : (
        <div className="pt-20 flex min-h-screen justify-center items-center rounded">
          Event not found!
        </div>
      )}
    </>
  );
}
