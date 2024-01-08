USE [SmogIt]
GO
/****** Object:  Table [dbo].[Appointments]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointments](
	[AppointmentId] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[VehicleId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[AppointmentDateTime] [datetime] NOT NULL,
	[Notes] [text] NULL,
 CONSTRAINT [PK__Appointm__8ECDFCA22B11A283] PRIMARY KEY CLUSTERED 
(
	[AppointmentId] ASC
)
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AppointmentServices]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppointmentServices](
	[AppointmentID] [int] NOT NULL,
	[ServiceID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AppointmentID] ASC,
	[ServiceID] ASC
)
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NULL,
	[Email] [varchar](200) NULL,
	[Phone] [varchar](20) NOT NULL,
	[RegistrationDate] [datetime] NOT NULL,
 CONSTRAINT [PK__Clients__E67E1A0404588678] PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Services]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Services](
	[ServiceId] [int] IDENTITY(1,1) NOT NULL,
	[ServiceName] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[Price] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK__Services__C51BB0EAA00645C2] PRIMARY KEY CLUSTERED 
(
	[ServiceId] ASC
)
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[StatusId] [int] NOT NULL,
	[StatusName] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NULL,
	[Email] [varchar](100) NULL,
	[Password] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicles]    Script Date: 1/7/2024 7:14:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicles](
	[VehicleId] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[VehicleMake] [varchar](50) NOT NULL,
	[VehicleModel] [varchar](50) NOT NULL,
	[LicensePlate] [varchar](20) NULL,
 CONSTRAINT [PK__Vehicles__476B54B28BFE9646] PRIMARY KEY CLUSTERED 
(
	[VehicleId] ASC
)
) ON [PRIMARY]
GO
INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (4, N'Canceled')
GO
INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (3, N'Completed')
GO
INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (2, N'In Progress')
GO
INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (1, N'Pending')
GO
/****** Object:  Index [UC_Client_Appointment]    Script Date: 1/7/2024 7:14:58 PM ******/
ALTER TABLE [dbo].[Appointments] ADD  CONSTRAINT [UC_Client_Appointment] UNIQUE NONCLUSTERED 
(
	[ClientId] ASC,
	[VehicleId] ASC,
	[AppointmentDateTime] ASC
)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Status__05E7698AF3DD10C2]    Script Date: 1/7/2024 7:14:58 PM ******/
ALTER TABLE [dbo].[Status] ADD UNIQUE NONCLUSTERED 
(
	[StatusName] ASC
)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__A9D10534487DF870]    Script Date: 1/7/2024 7:14:58 PM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)
GO
ALTER TABLE [dbo].[Clients] ADD  CONSTRAINT [DF__Clients__Registr__24927208]  DEFAULT (getdate()) FOR [RegistrationDate]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Appointments]  WITH CHECK ADD  CONSTRAINT [FK__Appointme__Clien__2E1BDC42] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Clients] ([ClientId])
GO
ALTER TABLE [dbo].[Appointments] CHECK CONSTRAINT [FK__Appointme__Clien__2E1BDC42]
GO
ALTER TABLE [dbo].[Appointments]  WITH CHECK ADD  CONSTRAINT [FK__Appointme__Statu__300424B4] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[Appointments] CHECK CONSTRAINT [FK__Appointme__Statu__300424B4]
GO
ALTER TABLE [dbo].[Appointments]  WITH CHECK ADD  CONSTRAINT [FK__Appointme__Vehic__2F10007B] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([VehicleId])
GO
ALTER TABLE [dbo].[Appointments] CHECK CONSTRAINT [FK__Appointme__Vehic__2F10007B]
GO
ALTER TABLE [dbo].[AppointmentServices]  WITH CHECK ADD  CONSTRAINT [FK__Appointme__Appoi__34C8D9D1] FOREIGN KEY([AppointmentID])
REFERENCES [dbo].[Appointments] ([AppointmentId])
GO
ALTER TABLE [dbo].[AppointmentServices] CHECK CONSTRAINT [FK__Appointme__Appoi__34C8D9D1]
GO
ALTER TABLE [dbo].[AppointmentServices]  WITH CHECK ADD  CONSTRAINT [FK__Appointme__Servi__35BCFE0A] FOREIGN KEY([ServiceID])
REFERENCES [dbo].[Services] ([ServiceId])
GO
ALTER TABLE [dbo].[AppointmentServices] CHECK CONSTRAINT [FK__Appointme__Servi__35BCFE0A]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [FK__Vehicles__Client__276EDEB3] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Clients] ([ClientId])
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK__Vehicles__Client__276EDEB3]
GO
