"use client"

import { Button, Input, Label, ListBox , Calendar , DateField , DatePicker , ComboBox } from "@heroui/react"

export default function Register() {
    return (
        <>
            <main className="p-4">
                <h1>Register with Trendly Social app</h1>
                <p>Join our vibrant community and connect with friends, share your moments, and discover new trends. Sign up now to start your social journey with us!</p>
                <form className="m-auto md:w-1/2 shadow-lg p-4 rounded-lg border border-separator">
                    {/* Name */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" type="text" />
                        {/* UserName */}
                    </div>
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="username">User name</Label>
                        <Input id="username" placeholder="Enter your user name" type="text" />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="jane@example.com" type="email" />
                    </div>
                    {/* Date of birth */}
                    <DatePicker className="w-full" name="date">
                        <Label>Date Of Birth</Label>
                        <DateField.Group fullWidth>
                            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                            <DateField.Suffix>
                                <DatePicker.Trigger>
                                    <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                            </DateField.Suffix>
                        </DateField.Group>
                        <DatePicker.Popover>
                            <Calendar aria-label="Event date">
                                <Calendar.Header>
                                    <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                    </Calendar.YearPickerTrigger>
                                    <Calendar.NavButton slot="previous" />
                                    <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                    <Calendar.GridHeader>
                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                    <Calendar.YearPickerGridBody>
                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>
                    {/* Gender */}
                    <ComboBox className="w-full">
                        <Label>Gender</Label>
                        <ComboBox.InputGroup>
                            <Input placeholder="Select your gender..." />
                            <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                <ListBox.Item id="male" textValue="Male">
                                    Male
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="female" textValue="Female">
                                    Female
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                    {/* Password   */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="Enter your password" type="password" />
                    </div>
                    {/* Confirm Password   */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="rePassword">Confirm Password</Label>
                        <Input id="rePassword" placeholder="Confirm your password" type="password" />
                    </div>
                    <Button className='w-full mt-2' variant="outline">Register</Button>
                </form>
            </main>
        </>
    )
}
