"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventsManagement() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    event_type: "fashion_show",
    start_date: "",
    location: "",
    registration_fee: 0,
    max_participants: 100
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })
    
    if (data) setEvents(data)
    setLoading(false)
  }

  const handleCreateEvent = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('events')
      .insert({
        ...newEvent,
        organizer_id: user.id,
        status: 'published'
      })

    if (!error) {
      setIsCreateOpen(false)
      fetchEvents()
      setNewEvent({
        title: "",
        event_type: "fashion_show",
        start_date: "",
        location: "",
        registration_fee: 0,
        max_participants: 100
      })
    }
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('events').update({ status }).eq('id', id)
    fetchEvents()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Events Management</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Icons.plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select 
                    value={newEvent.event_type}
                    onValueChange={(v) => setNewEvent({...newEvent, event_type: v})}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion_show">Fashion Show</SelectItem>
                      <SelectItem value="photoshoot">Photoshoot</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input 
                    type="datetime-local"
                    value={newEvent.start_date}
                    onChange={(e) => setNewEvent({...newEvent, start_date: e.target.value})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fee (₹)</Label>
                  <Input 
                    type="number"
                    value={newEvent.registration_fee}
                    onChange={(e) => setNewEvent({...newEvent, registration_fee: parseInt(e.target.value)})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Participants</Label>
                  <Input 
                    type="number"
                    value={newEvent.max_participants}
                    onChange={(e) => setNewEvent({...newEvent, max_participants: parseInt(e.target.value)})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <Button onClick={handleCreateEvent} className="w-full bg-red-600 hover:bg-red-700 mt-4">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400">Event</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-400">Loading...</TableCell>
              </TableRow>
            ) : events.map((event) => (
              <TableRow key={event.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium text-white">
                  <div>
                    <p>{event.title}</p>
                    <p className="text-xs text-gray-500">{event.location}</p>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">
                  {new Date(event.start_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-white/20 text-gray-300 capitalize">
                    {event.event_type.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={
                    event.status === 'published' ? "bg-green-500/20 text-green-500" :
                    event.status === 'completed' ? "bg-blue-500/20 text-blue-500" :
                    "bg-gray-500/20 text-gray-500"
                  }>
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {event.status === 'published' && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => updateStatus(event.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-400 hover:text-red-300"
                      onClick={() => updateStatus(event.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
