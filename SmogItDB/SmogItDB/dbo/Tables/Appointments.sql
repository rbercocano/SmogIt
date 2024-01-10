CREATE TABLE [dbo].[Appointments] (
    [AppointmentId]       INT      IDENTITY (1, 1) NOT NULL,
    [VehicleId]           INT      NOT NULL,
    [StatusId]            SMALLINT      NOT NULL,
    [AppointmentDateTime] DATETIME NOT NULL,
    [Notes]               VARCHAR(MAX)     NULL,
    CONSTRAINT [PK_Appointments] PRIMARY KEY CLUSTERED ([AppointmentId] ASC),
    CONSTRAINT [FK_Appointments_Status] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[Status] ([StatusId]),
    CONSTRAINT [FK_Appointments_Vehicles] FOREIGN KEY ([VehicleId]) REFERENCES [dbo].[Vehicles] ([VehicleId])
);

