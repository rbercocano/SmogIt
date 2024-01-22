CREATE TABLE [dbo].[AppointmentServices] (
    [AppointmentServiceId] INT  IDENTITY (1, 1) NOT NULL, 
    [AppointmentID] INT NOT NULL,
    [ServiceID]     INT NOT NULL,
    [Price] DECIMAL(10, 2) CONSTRAINT [DF_AppointmentServices_Price] DEFAULT (0) NOT NULL,
    [OriginalPrice] DECIMAL(10, 2) NOT NULL DEFAULT (0), 
    CONSTRAINT [PK_AppointmentServices] PRIMARY KEY CLUSTERED (AppointmentServiceId),
    CONSTRAINT [FK_AppointmentServices_Appointments] FOREIGN KEY ([AppointmentID]) REFERENCES [dbo].[Appointments] ([AppointmentId]),
    CONSTRAINT [FK_AppointmentServices_Services] FOREIGN KEY ([ServiceID]) REFERENCES [dbo].[Services] ([ServiceId])
);

