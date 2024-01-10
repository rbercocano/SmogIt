CREATE TABLE [dbo].[AppointmentServices] (
    [AppointmentID] INT NOT NULL,
    [ServiceID]     INT NOT NULL,
    CONSTRAINT [PK_AppointmentServices] PRIMARY KEY CLUSTERED ([AppointmentID] ASC, [ServiceID] ASC),
    CONSTRAINT [FK_AppointmentServices_Appointments] FOREIGN KEY ([AppointmentID]) REFERENCES [dbo].[Appointments] ([AppointmentId]),
    CONSTRAINT [FK_AppointmentServices_Services] FOREIGN KEY ([ServiceID]) REFERENCES [dbo].[Services] ([ServiceId])
);

