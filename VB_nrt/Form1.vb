Public Class Form1
    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Dim Starttemp, Fintemp As Double
        Starttemp = TextBox1.Text
        Fintemp = (5 / 9) * (Starttemp - 32)
        Label3.Text = Fintemp
        Label3.Visible = True
        Label4.Visible = True
        If Starttemp > 100 Then
            Label5.ForeColor = Color.Red
            Label5.Text = "Better Hydrate!"
            Label5.Visible = True
        ElseIf Starttemp < 32 Then
            Label5.ForeColor = Color.BlueViolet
            Label5.Text = "Brr! Pack the Long Johns!!!"
            Label5.Visible = True
        End If
    End Sub
    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click
        TextBox1.Text = ""
        Label3.Visible = False
        Label4.Visible = False
        Label5.Visible = False
    End Sub
End Class
