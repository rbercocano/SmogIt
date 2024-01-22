IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 1 AND [StatusName] = N'Pending')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (1, N'Pending')
END
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 2 AND [StatusName] = N'In Progress')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (2, N'In Progress')
END
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 3 AND [StatusName] = N'Completed')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (3, N'Completed')
END
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 4 AND [StatusName] = N'Cancelled')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (4, N'Cancelled')
END
